/**
 * Service for working with shapes, sizes and positions of objects.
 */
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import {
  Alignment,
  AlignmentResult,
  ClientRect,
  CollisionResultType,
  CollisionType,
  HorizontalPosition,
  Point,
  Position,
  RectClippedOffset,
  RectVisibility,
  VerticalPosition,
} from './geometry.model';

@Injectable()
export class GeometryService {
  /**
   * Aligns a rectangle to another rectangle and uses collision detection.
   * @param alignment The alignment options
   */
  alignRectWithCollision(alignment: Alignment): AlignmentResult {
    alignment = this.getAlignmentDefaults(alignment);
    // Do the initial alignment
    let result = this.alignRect(alignment);

    // Do any collision detection
    if (alignment.collision !== CollisionType.None) {
      const collisionMethod = this.getCollisionMethod(alignment.collision);
      result = this[collisionMethod](result.alignment);
    }

    return result;
  }

  /**
   * Aligns a rectangle to another rectangle.
   * @param alignment The alignment options
   */
  alignRect(alignment: Alignment): AlignmentResult {
    alignment = this.getAlignmentDefaults(alignment);

    const result = this.getAlignmentResultDefaults();
    // Get the point, at the position to align, and add it to the custom user offset
    let toPoint = this.getPoint(alignment.toRect, alignment.toPosition);
    toPoint = this.addPoints(toPoint, alignment.offset);

    alignment.moveRect = this.moveRectToPoint(alignment.moveRect, alignment.movePosition, toPoint);
    result.alignment = alignment;

    return result;
  }

  /**
   * Flips the position of a rectangle, when aligning it to another rectangle, if it results in more of the rectangle
   * being visible.
   * @param alignment The alignment options
   */
  flipRect(alignment: Alignment): AlignmentResult {
    alignment = this.getAlignmentDefaults(alignment);

    const result = this.getAlignmentResultDefaults();
    // Test how the rectangle is clipped at the current position
    const moveRect = alignment.moveRect;
    const clippedOffset = this.getClippedOffset(moveRect, alignment.within);

    // Test how the rectangle would be clipped if its positioned is flipped
    const flippedAlignment = {
      ...alignment,
      movePosition: this.flipPosition(alignment.movePosition),
      toPosition: this.flipPosition(alignment.toPosition),
      offset: this.invertPoint(alignment.offset),
    };
    const flippedAlignmentResult = this.alignRect(flippedAlignment);
    const flippedRect = flippedAlignmentResult.alignment.moveRect;
    const flippedClippedOffset = this.getClippedOffset(flippedRect, alignment.within);
    // Check which sides are more visible with the flipped alignment
    const flippedVisibility = this.compareRectVisibility(flippedClippedOffset, clippedOffset);

    // Flip the horizontal direction if it makes more of the element visible
    if (flippedVisibility.leftMoreVisible || flippedVisibility.rightMoreVisible) {
      alignment.movePosition.horizontal = flippedAlignment.movePosition.horizontal;
      alignment.toPosition.horizontal = flippedAlignment.toPosition.horizontal;
      alignment.offset.x = flippedAlignment.offset.x;
      result.collision.flipped.horizontal = true;
      result.collision.flipped.offset.x = flippedAlignmentResult.alignment.moveRect.left - moveRect.left;
    }

    // Flip the vertical direction if it makes more of the element visible
    if (flippedVisibility.topMoreVisible || flippedVisibility.bottomMoreVisible) {
      alignment.movePosition.vertical = flippedAlignment.movePosition.vertical;
      alignment.toPosition.vertical = flippedAlignment.toPosition.vertical;
      alignment.offset.y = flippedAlignment.offset.y;
      result.collision.flipped.vertical = true;
      result.collision.flipped.offset.y = flippedAlignmentResult.alignment.moveRect.top - moveRect.top;
    }

    // Do the alignment, using the flipped values (if any were set) and update the result
    result.alignment = this.alignRect(alignment).alignment;

    if (result.collision.flipped.horizontal || result.collision.flipped.vertical) {
      result.collision.type = CollisionResultType.Flipped;
    }

    return result;
  }

  /**
   * Fits the position of a rectangle within another rectangle so most of its area is visible. If the rectangle is not
   * clipped within another rectangle, then its position is not changed.
   * @param alignment The alignment options.
   */
  fitRect(alignment: Alignment): AlignmentResult {
    alignment = this.getAlignmentDefaults(alignment);

    const result = this.getAlignmentResultDefaults();
    // Test which sides are the most hidden
    const clippedOffset = this.getClippedOffset(alignment.moveRect, alignment.within);
    const isLeftMoreHidden = Math.abs(clippedOffset.left) > Math.abs(clippedOffset.right);
    const isTopMoreHidden = Math.abs(clippedOffset.top) > Math.abs(clippedOffset.bottom);

    // Offset the direction that allows more of the element to be visible
    const fitOffsetPoint = {
      x: isLeftMoreHidden ? clippedOffset.left : clippedOffset.right,
      y: isTopMoreHidden ? clippedOffset.top : clippedOffset.bottom,
    };

    // Offset to fit
    alignment.moveRect = this.offsetRectByPoint(alignment.moveRect, fitOffsetPoint);

    // Update the result
    result.alignment = alignment;
    if (fitOffsetPoint.x !== 0 || fitOffsetPoint.y !== 0) {
      result.collision.type = CollisionResultType.Fitted;
      result.collision.fitted.horizontal = fitOffsetPoint.x !== 0;
      result.collision.fitted.vertical = fitOffsetPoint.y !== 0;
      result.collision.fitted.offset = fitOffsetPoint;
    }

    return result;
  }

  /**
   * Flips the position of a rectangle, then fits it within a container rectangle so that most of it is visible.
   * @param alignment The alignment options
   */
  flipThenFitRect(alignment: Alignment): AlignmentResult {
    alignment = this.getAlignmentDefaults(alignment);

    const result = this.getAlignmentResultDefaults();
    // First flip if necessary
    const flipResult = this.flipRect(alignment);
    const didFlip = flipResult.collision.type === CollisionResultType.Flipped;

    // Then fit if necessary
    const fitResult = this.fitRect(flipResult.alignment);
    const didFit = fitResult.collision.type === CollisionResultType.Fitted;

    // Check which collision detections were done
    if (didFlip && didFit) {
      result.collision.type = CollisionResultType.FlippedThenFitted;
    } else if (didFlip) {
      result.collision.type = CollisionResultType.Flipped;
    } else if (didFit) {
      result.collision.type = CollisionResultType.Fitted;
    }

    // Update the result
    result.alignment = fitResult.alignment;
    result.collision.flipped = flipResult.collision.flipped;
    result.collision.fitted = fitResult.collision.fitted;
    result.collision.offset = this.addPoints(result.collision.flipped.offset, result.collision.fitted.offset);

    return result;
  }

  /**
   * Flips the horizontal and vertical position.
   * @param position The position
   */
  flipPosition(position: Position): Position {
    return {
      horizontal: this.flipHorizontalPosition(position.horizontal),
      vertical: this.flipVerticalPosition(position.vertical),
    };
  }

  /**
   * Flips the horizontal position.
   * @param position The horizontal position
   */
  flipHorizontalPosition(position: HorizontalPosition): HorizontalPosition {
    if (position === HorizontalPosition.Left) {
      return HorizontalPosition.Right;
    } else if (position === HorizontalPosition.Right) {
      return HorizontalPosition.Left;
    }

    return HorizontalPosition.Center;
  }

  /**
   * Flips the vertical position.
   * @param position The position
   */
  flipVerticalPosition(position: VerticalPosition): VerticalPosition {
    if (position === VerticalPosition.Top) {
      return VerticalPosition.Bottom;
    } else if (position === VerticalPosition.Bottom) {
      return VerticalPosition.Top;
    }

    return VerticalPosition.Center;
  }

  /**
   * Determines if two positions are equal.
   * @param positionA The first position
   * @param positionB The second position
   */
  arePositionsEqual(positionA: Position, positionB: Position): boolean {
    return positionA.horizontal === positionB.horizontal && positionA.vertical === positionB.vertical;
  }

  /**
   * Compares two clipped offsets and determines which sides of the first clipped offset are more visible.
   * @param clippedOffsetA The first clipped offset
   * @param clippedOffsetB The second clipped offset
   */
  compareRectVisibility(clippedOffsetA: RectClippedOffset, clippedOffsetB: RectClippedOffset): RectVisibility {
    return {
      topMoreVisible: Math.abs(clippedOffsetA.top) < Math.abs(clippedOffsetB.top),
      rightMoreVisible: Math.abs(clippedOffsetA.right) < Math.abs(clippedOffsetB.right),
      bottomMoreVisible: Math.abs(clippedOffsetA.bottom) < Math.abs(clippedOffsetB.bottom),
      leftMoreVisible: Math.abs(clippedOffsetA.left) < Math.abs(clippedOffsetB.left),
    };
  }

  /**
   * Gets a rectangle oriented to the side it's positioned against. For example, the browser gives positions
   * relative to the left-top, and you are positioning to the right-bottom then the point is relative to the right-bottom.
   * @param rect The rectangle
   * @param orientToRect The rectangle to orient to
   * @param orientToPosition The position to orient to
   */
  getOrientedRect(rect: ClientRect, orientToRect: ClientRect, orientToPosition: Position): ClientRect {
    const topLeft = {
      horizontal: HorizontalPosition.Left,
      vertical: VerticalPosition.Top,
    };

    const bottomRight = {
      horizontal: HorizontalPosition.Right,
      vertical: VerticalPosition.Bottom,
    };

    const topLeftPoint = this.getOrientedPoint(rect, topLeft, orientToRect, orientToPosition);
    const bottomRightPoint = this.getOrientedPoint(rect, bottomRight, orientToRect, orientToPosition);

    return {
      top: topLeftPoint.y,
      right: bottomRightPoint.x,
      bottom: bottomRightPoint.y,
      left: topLeftPoint.x,
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * Gets the point of a rectangle relative to the orientation position. For example, the browser gives positions
   * relative to the left-top, and you are positioning to the right-bottom then the point is relative to the right-bottom.
   * @param rect The rectangle
   * @param rectPosition The rectangle position to orient
   * @param within The rectangle to orient within
   * @param orientToPosition The position to orient to
   */
  getOrientedPoint(rect: ClientRect, rectPosition: Position, within: ClientRect, orientToPosition: Position): Point {
    const point = this.getPoint(rect, rectPosition);

    // Orient the horizontal position so it's point is relative to the right
    if (orientToPosition.horizontal === HorizontalPosition.Right) {
      point.x = within.width - rect[rectPosition.horizontal];
    }

    // Orient the vertical position so it's point is relative to the bottom
    if (orientToPosition.vertical === VerticalPosition.Bottom) {
      point.y = within.height - rect[rectPosition.vertical];
    }

    return point;
  }

  /**
   * Gets an offset point using a given orientation position.
   * @param offsetPoint The offset point.
   * @param orientToPosition The position to orient to
   */
  getOrientedOffsetPoint(offsetPoint: Point, orientToPosition: Position): Point {
    const orientedOffsetPoint = {
      x: offsetPoint.x,
      y: offsetPoint.y,
    };

    // Negate the horizontal value to get the equivalent offset from the right
    if (orientToPosition.horizontal === HorizontalPosition.Right) {
      orientedOffsetPoint.x *= -1;
    }

    // Negate the vertical value to get the equivalent offset from the bottom
    if (orientToPosition.vertical === VerticalPosition.Bottom) {
      orientedOffsetPoint.y *= -1;
    }

    return orientedOffsetPoint;
  }

  /**
   * Moves a rectangle to a point.
   * @param rect The rectangle
   * @param position The position
   * @param toPoint The point to move the rectangle to
   */
  moveRectToPoint(rect: ClientRect, position: Position, toPoint: Point): ClientRect {
    const newRect = {
      top: toPoint.y,
      right: toPoint.x + rect.width,
      bottom: toPoint.y + rect.height,
      left: toPoint.x,
      width: rect.width,
      height: rect.height,
    };

    const topLeftPoint = this.getPoint(newRect);
    const positionPoint = this.getPoint(newRect, position);
    // Get the difference between the top-left point and the point to the position
    const offsetToPositionPoint = this.subtractPoints(topLeftPoint, positionPoint);

    // Offset by the difference between the top-left point and the point to the position
    return this.offsetRectByPoint(newRect, offsetToPositionPoint);
  }

  /**
   * Offsets a rectangle by the distance values specified in a point.
   * @param rect The rectangle
   * @param point The point
   */
  offsetRectByPoint(rect: ClientRect, point: Point): ClientRect {
    return {
      top: rect.top + point.y,
      right: rect.right + point.x,
      bottom: rect.bottom + point.y,
      left: rect.left + point.x,
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * Makes the position boundaries of a rectangle relative to the position of another rectangle.
   * @param rect A rectangle
   * @param relativeToRect The rectangle to make relative to
   */
  makeRelativeToRect(rect: ClientRect, relativeToRect: ClientRect): ClientRect {
    let offsetRelativeToPoint = this.getPoint(relativeToRect);
    offsetRelativeToPoint = this.invertPoint(offsetRelativeToPoint);

    return this.offsetRectByPoint(rect, offsetRelativeToPoint);
  }

  /**
   * Gets a point of a rectangle at a given position.
   * @param rect The rectangle
   * @param position The position to get the point of
   */
  getPoint(rect: ClientRect, position?: Position): Point {
    if (!position) {
      return {
        y: rect.top,
        x: rect.left,
      };
    }

    const isVerticalCenter = position.vertical === VerticalPosition.Center;
    const isHorizontalCenter = position.horizontal === HorizontalPosition.Center;

    return {
      y: isVerticalCenter ? rect.top + rect.height / 2 : rect[position.vertical],
      x: isHorizontalCenter ? rect.left + rect.width / 2 : rect[position.horizontal],
    };
  }

  /**
   * Adds two points.
   * @param pointA The first point
   * @param pointB The second point
   */
  addPoints(pointA: Point, pointB: Point): Point {
    return {
      x: pointA.x + pointB.x,
      y: pointA.y + pointB.y,
    };
  }

  /**
   * Subtracts two points.
   * @param pointA The first point
   * @param pointB The second point
   */
  subtractPoints(pointA: Point, pointB: Point): Point {
    return {
      x: pointA.x - pointB.x,
      y: pointA.y - pointB.y,
    };
  }

  /**
   * Inverts the X and Y values of a point.
   * @param point The point
   */
  invertPoint(point: Point): Point {
    return {
      x: -point.x,
      y: -point.y,
    };
  }

  /**
   * Determines the amount each side of a rectangle needs to be offset to make it not clipped.
   * @param sourceRect The source rectangle
   * @param byRect The rectangle to check if source rectangle is clipped by
   */
  getClippedOffset(sourceRect: ClientRect, byRect: ClientRect): RectClippedOffset {
    if (!byRect) {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
    }

    const viewableSourceRect = this.getViewableRect(sourceRect);
    const viewableByRect = this.getViewableRect(byRect);

    return {
      top: viewableSourceRect.top > viewableByRect.top ? 0 : viewableByRect.top - viewableSourceRect.top,
      right: viewableSourceRect.right < viewableByRect.right ? 0 : viewableByRect.right - viewableSourceRect.right,
      bottom: viewableSourceRect.bottom < viewableByRect.bottom ? 0 : viewableByRect.bottom - viewableSourceRect.bottom,
      left: viewableSourceRect.left > viewableByRect.left ? 0 : viewableByRect.left - viewableSourceRect.left,
    };
  }

  /**
   * Gets the viewable area of a rectangle.
   * @param rect
   */
  getViewableRect(rect: ClientRect): ClientRect {
    return {
      top: rect.top,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * Gets the method name that corresponds to a given collision type.
   * @param collisionType The collision type
   */
  getCollisionMethod(collisionType: CollisionType): string {
    return `${collisionType}Rect`;
  }

  /**
   * Gets the alignment result using the defaults.
   * @param alignmentResult The alignment result
   */
  getAlignmentResultDefaults(alignmentResult?: AlignmentResult): AlignmentResult {
    const defaults = {
      alignment: this.getAlignmentDefaults(alignmentResult ? alignmentResult.alignment : null),
      collision: {
        type: CollisionResultType.Unchanged,
        offset: {
          x: 0,
          y: 0,
        },
        flipped: {
          horizontal: false,
          vertical: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        fitted: {
          horizontal: false,
          vertical: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
      },
    };
    return cloneDeep({ ...defaults, ...alignmentResult });
  }

  /**
   * Gets alignment options using the  defaults.
   * @param alignment The alignment options
   */
  getAlignmentDefaults(alignment?: Alignment): Alignment {
    const defaults = {
      movePosition: {
        vertical: VerticalPosition.Top,
        horizontal: HorizontalPosition.Left,
      },
      toPosition: {
        vertical: VerticalPosition.Bottom,
        horizontal: HorizontalPosition.Left,
      },
      offset: {
        x: 0,
        y: 0,
      },
      collision: CollisionType.None,
      ...alignment,
    };
    return cloneDeep({ ...defaults, ...alignment });
  }
}
