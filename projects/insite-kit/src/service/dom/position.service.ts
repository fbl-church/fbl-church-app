import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Observable, Subject, merge } from 'rxjs';
import { auditTime, map, startWith, takeUntil } from 'rxjs/operators';
import { ListenCallback } from './dom.model';
import { DOMService } from './dom.service';
import {
  Alignment,
  AlignmentResult,
  ClientRect,
  CollisionResultType,
  CollisionType,
  HorizontalPosition,
  Point,
  Position,
  VerticalPosition,
} from './geometry.model';
import { GeometryService } from './geometry.service';
import { DOMAlignment, DOMAlignmentResult, DOMPositionOrientation, DOMStickyAlignment } from './position.model';

/**
 * Service for working with positions of DOM elements.
 */
@Injectable()
export class PositionService implements OnDestroy {
  private readonly renderer: Renderer2;
  maxZIndex = 999999;
  destroyed = new Subject<void>();

  constructor(
    rendererFactory: RendererFactory2,
    private domService: DOMService,
    private geometryService: GeometryService
  ) {
    // Renderer2 can only be injected into a component, so it's required to use RendererFactory2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Aligns an element to another element and sticks the source element to the target element. When the
   * target element moves, either via scrolling or window resizing, the source element follows it.
   * @param domStickyAlignment The alignment options
   */
  stickyAlign(domStickyAlignment: DOMStickyAlignment): Observable<DOMAlignmentResult> {
    domStickyAlignment = this.getDOMStickyAlignmentDefaults(domStickyAlignment);

    const initialResult = this.align(domStickyAlignment);
    const scroll = this.getStickyScrollEvent(domStickyAlignment);
    const resize = this.domService.fromEvent(domStickyAlignment.within, 'resize');
    let events = merge(scroll, resize);

    if (domStickyAlignment.throttle) {
      events = events.pipe(auditTime(domStickyAlignment.throttle));
    }

    // Start with the initial alignment result, then update every time there is a scroll or resize event
    return events.pipe(
      map(() => this.alignUpdate(domStickyAlignment)),
      startWith(initialResult),
      takeUntil(this.destroyed)
    );
  }

  /**
   * Aligns an element to another element.
   * @param domAlignment The alignment options.
   */
  align(domAlignment: DOMAlignment): DOMAlignmentResult {
    domAlignment = this.getDOMAlignmentDefaults(domAlignment);

    this.appendToParent(domAlignment);
    this.addClasses(domAlignment);
    this.addStyles(domAlignment);

    // Calculate the alignment
    const alignment = this.getAlignment(domAlignment);
    const alignmentResult = this.geometryService.alignRectWithCollision(alignment);

    this.makeRelativeToOffsetParent(domAlignment, alignmentResult);
    this.offsetByParentScroll(domAlignment, alignmentResult);
    this.orient(domAlignment, alignmentResult);

    this.updateClasses(domAlignment, alignmentResult);
    this.invokeCallback(domAlignment.beforeAlign, alignmentResult);

    // Update the position
    this.update(domAlignment, alignmentResult);

    return {
      domAlignment,
      collision: alignmentResult.collision,
    };
  }

  /**
   * Updates the alignment in an efficient way that utilizes GPU acceleration and prevents layout related calculations
   * over the entire document.
   * @param domAlignment The DOM alignment
   */
  alignUpdate(domAlignment: DOMAlignment): DOMAlignmentResult {
    domAlignment = this.getDOMAlignmentDefaults(domAlignment);

    if (!this.areTransformsEnabled(domAlignment)) {
      return this.align(domAlignment);
    }

    // Calculate the alignment
    const alignment = this.getAlignment(domAlignment);
    const alignmentResult = this.geometryService.alignRectWithCollision(alignment);

    this.makeRelativeToOffsetParent(domAlignment, alignmentResult);
    this.offsetByParentScroll(domAlignment, alignmentResult);
    this.orient(domAlignment, alignmentResult);

    this.updateClasses(domAlignment, alignmentResult);
    this.invokeCallback(domAlignment.beforeAlign, alignmentResult);

    // Offset the position from the original alignment
    this.offset(domAlignment, alignmentResult);

    return {
      domAlignment,
      collision: alignmentResult.collision,
    };
  }

  /**
   * Determines if transforms are enabled.
   * @param domStickyAlignment
   */
  areTransformsEnabled(domStickyAlignment: DOMStickyAlignment): boolean {
    const supportsTransform = !!this.domService.getSupportedStyle('transform');
    return supportsTransform && domStickyAlignment.enableTransforms;
  }

  /**
   * Makes the "move" rectangle, in the given alignment result, relative to the nearest positioned parent.
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  makeRelativeToOffsetParent(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    if (this.domService.isFixed(domAlignment.moveElement)) {
      return;
    }

    const alignment = alignmentResult.alignment;
    // If the element is a child of the body element, and the body is position static, then offsetParent will be null.
    // In this case, just use the parent node.
    const offsetParent =
      domAlignment.moveElement.offsetParent || this.renderer.parentNode(domAlignment.moveElement) || document.body;
    const offsetParentRect = offsetParent.getBoundingClientRect();

    alignment.moveRect = this.geometryService.makeRelativeToRect(alignment.moveRect, offsetParentRect);
  }

  /**
   * Gets the event used to track scrolling.
   * @param domStickyAlignment The DOM alignment
   */
  getStickyScrollEvent(domStickyAlignment: DOMStickyAlignment): Observable<any> {
    let events = this.getCustomScrollEvents(domStickyAlignment);

    const hasCollisionDetection = domStickyAlignment.collision !== CollisionType.None;
    const scrollParent = this.domService.findScrollableOffsetParent(domStickyAlignment.toElement);

    // Don't track if the "move" element is not position "fixed"
    if (!hasCollisionDetection && !this.domService.isFixed(domStickyAlignment.moveElement)) {
      return events;
    }

    // Also track scrolling if the position "to" element:
    //
    // 1. Is in normal page flow
    // 2. And has a parent that can scroll
    // 3. And that parent is position "fixed" or has a "fixed" ancestor
    const isInNormalPageFlow = this.domService.isInNormalPageFlow(domStickyAlignment.toElement);
    const isScrollParentFixed = this.domService.isFixed(scrollParent);
    const isScrollAncestorFixed = !!this.domService.findFixedOffsetParent(scrollParent);

    const shouldTrackScrollParent =
      isInNormalPageFlow && !!scrollParent && (isScrollParentFixed || isScrollAncestorFixed);

    if (hasCollisionDetection || shouldTrackScrollParent) {
      events = merge(events, this.domService.fromEvent(scrollParent, 'scroll'));
    }

    return events;
  }

  /**
   * Gets the custom scroll events to track.
   * @param domStickyAlignment The DOM alignment
   */
  getCustomScrollEvents(domStickyAlignment: DOMStickyAlignment): Observable<any> {
    let elementsToTrack;

    if (typeof domStickyAlignment.trackScroll === 'function') {
      elementsToTrack = domStickyAlignment.trackScroll();
    } else {
      elementsToTrack = this.domService.querySelector(domStickyAlignment.trackScroll);
    }

    return this.domService.fromEvent(elementsToTrack, 'scroll');
  }

  /**
   * Gets the CSS position for the "move" element.
   * @param domAlignment The DOM alignment
   */
  getPositionStyle(domAlignment: DOMAlignment): string {
    // Use position "fixed" for the "move" element if its CSS is position fixed
    const moveElementIsFixed = this.domService.isFixed(domAlignment.moveElement);

    if (moveElementIsFixed) {
      return 'fixed';
    }

    const offsetParent = domAlignment.moveElement.offsetParent;

    // If the parent "move" element is not inside the html or body, the use position "absolute" so the "move" element
    // is positioned inside the nearest positioned element, i.e., its offset parent
    if (offsetParent !== document.documentElement && offsetParent !== document.body) {
      return 'absolute';
    }

    // Use position "fixed" for the "move" element if the "to" element is fixed
    const toElementIsFixed = this.domService.isFixed(domAlignment.toElement);
    // Use position "fixed" for the "move" element if the "to" element has a "fixed" parent
    const toElementHasFixedParent = !!this.domService.findFixedOffsetParent(domAlignment.toElement);

    const shouldBeFixed = toElementHasFixedParent || toElementIsFixed;
    return shouldBeFixed ? 'fixed' : 'absolute';
  }

  /**
   * Flips the position of the "move" element behaving as though it were the original orientation. For example, if the
   * vertical position flipped from "top" to "bottom", the new orientation will be based on aligning from the "bottom".
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  flipOrientation(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    const style = this.domService.getComputedStyle(domAlignment.moveElement);
    const movePosition = alignmentResult.alignment.movePosition;
    const otherSide = this.geometryService.flipPosition(movePosition);

    this.domService.setStyles(domAlignment.moveElement, {
      [movePosition.horizontal]: style[movePosition.horizontal],
      [movePosition.vertical]: style[movePosition.vertical],
      [otherSide.horizontal]: 'auto',
      [otherSide.vertical]: 'auto',
    });
  }

  /**
   * Determines if the position was just flipped by checking the value of each positioned side. Sides that
   * are positioned have values, like "20px", and sides that are not positioned have the value "auto".
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  justFlipped(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): boolean {
    // Flipping is only detected when the orientation is "my position"
    if (domAlignment.orientation === DOMPositionOrientation.TopLeft) {
      return false;
    }

    // Check the collision options to determine if it's necessary to move on with the "flipped" check below
    if (domAlignment.collision !== CollisionType.Flip && domAlignment.collision !== CollisionType.FlipThenFit) {
      return false;
    }

    const resultPosition = alignmentResult.alignment.movePosition;
    const style = domAlignment.moveElement.style;

    // The aligned side will always have a position value, and the non-positioned side will be "auto", so
    // if the resultant side is position "auto", then it hasn't yet been positioned, i.e., it just flipped
    const didHorizontalChange = style[resultPosition.horizontal] === 'auto';
    const didVerticalChange = style[resultPosition.vertical] === 'auto';

    return didHorizontalChange || didVerticalChange;
  }

  /**
   * Applies the the scroll of the offset parent.
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  offsetByParentScroll(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    const alignment = alignmentResult.alignment;
    const offsetParent = domAlignment.moveElement.offsetParent;

    if (offsetParent !== document.documentElement && this.domService.isScrollable(offsetParent)) {
      const scrollOffsetPoint = this.getScrollOffsetPoint(offsetParent);
      alignment.moveRect = this.geometryService.offsetRectByPoint(alignment.moveRect, scrollOffsetPoint);
    }
  }

  /**
   * Gets the original alignment point from the computed styles on the "move" element.
   * @param domAlignment The DOM alignment
   */
  getOriginalAlignPoint(domAlignment: DOMAlignment): Point {
    const style = this.domService.getComputedStyle(domAlignment.moveElement);
    const movePosition = this.getOrientedPosition(domAlignment);

    return {
      // Need to account for fractions of a pixel since browsers support that. Also, this prevents subtle misalignments.
      x: parseFloat(style[movePosition.horizontal]),
      y: parseFloat(style[movePosition.vertical]),
    };
  }

  /**
   * Invokes a callback if it is defined and is a function.
   * @param callback The callback
   * @param args The arguments to pass to the callback
   */
  invokeCallback(callback: ListenCallback, ...args: any[]): boolean | void {
    if (typeof callback === 'function') {
      callback.apply(null, args);
    }
  }

  /**
   * Appends the element, that needs moved, to the element set in "appendTo". If the "enableAppendTo" option is
   * disabled, the element is left where it currently is in the DOM.
   * appended to the body.
   * @param domAlignment The alignment options
   */
  appendToParent(domAlignment: DOMAlignment): void {
    if (!domAlignment.enableAppendTo) {
      return;
    }

    const parentNode = this.renderer.parentNode(domAlignment.moveElement);

    if (parentNode && parentNode !== domAlignment.appendTo) {
      this.renderer.appendChild(domAlignment.appendTo, domAlignment.moveElement);
      // If the "move" element was previous position "fixed", then it will not have an offset parent, which
      // will interfere with the positioning in this service. So removing the styles set by this service
      // ensures that doesn't happen.
      this.removeStyles(domAlignment);
      this.removeClasses(domAlignment);
    }
  }

  /**
   * Updates the position of the "move" element.
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  update(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    const movePosition = this.getOrientedPosition(domAlignment);
    const moveToPoint = this.geometryService.getPoint(alignmentResult.alignment.moveRect, movePosition);
    const otherSide = this.geometryService.flipPosition(movePosition);

    this.domService.setStyles(domAlignment.moveElement, {
      [movePosition.horizontal]: `${moveToPoint.x}px`,
      [movePosition.vertical]: `${moveToPoint.y}px`,
      [otherSide.horizontal]: 'auto',
      [otherSide.vertical]: 'auto',
    });

    if (this.areTransformsEnabled(domAlignment)) {
      this.domService.translate3d(domAlignment.moveElement, { x: 0, y: 0 });
    }
  }

  /**
   * Offsets the current position of an element.
   * @param domAlignment The DOM alignment result
   * @param alignmentResult The alignment result
   */
  offset(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    // Flip the orientation if the result caused the "move" element to flip
    if (this.justFlipped(domAlignment, alignmentResult)) {
      this.flipOrientation(domAlignment, alignmentResult);
      return;
    }

    // Get the point to move to
    const movePosition = this.getOrientedPosition(domAlignment);
    const moveToPoint = this.geometryService.getPoint(alignmentResult.alignment.moveRect, movePosition);

    // Calculate the offset from the original alignment point
    const originalAlignPoint = this.getOriginalAlignPoint(domAlignment);
    const offsetPoint = this.geometryService.subtractPoints(moveToPoint, originalAlignPoint);
    const orientedOffsetPoint = this.geometryService.getOrientedOffsetPoint(offsetPoint, movePosition);

    this.domService.translate3d(domAlignment.moveElement, orientedOffsetPoint);
  }

  /**
   * Gets the position of the "move" element, to use for alignment, based on orientation setting.
   * @param domAlignment The DOM alignment
   */
  getOrientedPosition(domAlignment: DOMAlignment): Position {
    if (domAlignment.orientation === DOMPositionOrientation.TopLeft) {
      return {
        horizontal: HorizontalPosition.Left,
        vertical: VerticalPosition.Top,
      };
    }

    const orientedPosition = {
      horizontal: domAlignment.movePosition.horizontal,
      vertical: domAlignment.movePosition.vertical,
    };

    if (orientedPosition.horizontal === HorizontalPosition.Center) {
      orientedPosition.horizontal = HorizontalPosition.Left;
    }

    if (orientedPosition.vertical === VerticalPosition.Center) {
      orientedPosition.vertical = VerticalPosition.Top;
    }

    return orientedPosition;
  }

  /**
   * Orients the alignment result to the target position. Browsers deal with positions oriented to the left-top,
   * and this orients the position to whatever position the "move" rectangle is aligned to.
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  orient(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    const alignment = alignmentResult.alignment;
    const moveElement = domAlignment.moveElement;
    const fullWithin = domAlignment.within.getBoundingClientRect();

    // If the "move" element is fixed, then use the visible document as the available area; otherwise, use the entire
    // "within" element's bounds
    const within = this.domService.isFixed(moveElement) ? this.getViewableDocumentRect() : fullWithin;
    const orientPosition = this.getOrientedPosition(domAlignment);

    alignment.moveRect = this.geometryService.getOrientedRect(alignment.moveRect, within, orientPosition);
  }

  /**
   * Add the styles on the "move" element based on the setting in a given DOM alignment.
   * @param domAlignment The DOM alignment
   */
  addStyles(domAlignment: DOMAlignment): void {
    this.domService.setStyles(domAlignment.moveElement, {
      zIndex: domAlignment.zIndex,
      position: this.getPositionStyle(domAlignment),
    });
  }

  /**
   * Removes the styles on the "move" element that were set by this service.
   * @param domAlignment The DOM alignment
   */
  removeStyles(domAlignment: DOMAlignment): void {
    this.domService.setStyles(domAlignment.moveElement, {
      zIndex: '',
      position: '',
    });
  }

  /**
   * Adds the CSS classes to the "move" and "to" element.
   * @param domAlignment The DOM alignment
   */
  addClasses(domAlignment: DOMAlignment): void {
    this.domService.addClass(domAlignment.moveElement, 'position');
    this.domService.addClass(domAlignment.toElement, 'position__target');

    const topLeft = domAlignment.orientation === DOMPositionOrientation.TopLeft;
    const myPosition = domAlignment.orientation === DOMPositionOrientation.MyPosition;
    this.domService.updateClass(domAlignment.moveElement, 'position--orientation-top-left', topLeft);
    this.domService.updateClass(domAlignment.moveElement, 'position--orientation-my-position', myPosition);
  }

  /**
   * Updates the CSS classes to reflect the result of the alignment.
   * @param domAlignment The DOM alignment
   * @param alignmentResult The alignment result
   */
  updateClasses(domAlignment: DOMAlignment, alignmentResult: AlignmentResult): void {
    const moveElement = domAlignment.moveElement;

    const flipped = alignmentResult.collision.type === CollisionResultType.Flipped;
    const fitted = alignmentResult.collision.type === CollisionResultType.Fitted;
    const flippedThenFitted = alignmentResult.collision.type === CollisionResultType.FlippedThenFitted;
    this.domService.updateClass(moveElement, 'position--flipped', flipped);
    this.domService.updateClass(moveElement, 'position--fitted', fitted);
    this.domService.updateClass(moveElement, 'position--flipped-then-fitted', flippedThenFitted);

    const flippedPosition = alignmentResult.collision.flipped;
    this.domService.updateClass(moveElement, 'position--flipped-horizontal', flippedPosition.horizontal);
    this.domService.updateClass(moveElement, 'position--flipped-vertical', flippedPosition.vertical);

    const fittedPosition = alignmentResult.collision.fitted;
    this.domService.updateClass(moveElement, 'position--fitted-horizontal', fittedPosition.horizontal);
    this.domService.updateClass(moveElement, 'position--fitted-vertical', fittedPosition.vertical);

    const horizontal = domAlignment.movePosition.horizontal;
    const vertical = domAlignment.movePosition.vertical;
    this.domService.updateClass(moveElement, 'position--horizontal-left', horizontal === HorizontalPosition.Left);
    this.domService.updateClass(moveElement, 'position--horizontal-right', horizontal === HorizontalPosition.Right);
    this.domService.updateClass(moveElement, 'position--horizontal-center', horizontal === HorizontalPosition.Center);
    this.domService.updateClass(moveElement, 'position--vertical-top', vertical === VerticalPosition.Top);
    this.domService.updateClass(moveElement, 'position--vertical-bottom', vertical === VerticalPosition.Bottom);
    this.domService.updateClass(moveElement, 'position--vertical-center', vertical === VerticalPosition.Center);
  }

  /**
   * Removes all of the CSS classes added by the service.
   * @param domAlignment The DOM alignment
   */
  removeClasses(domAlignment: DOMAlignment): void {
    const moveElement = domAlignment.moveElement;

    this.domService.removeClass(moveElement, 'position');
    this.domService.removeClass(moveElement, 'position__target');

    this.domService.removeClass(moveElement, 'position--flipped');
    this.domService.removeClass(moveElement, 'position--fitted');
    this.domService.removeClass(moveElement, 'position--flipped-then-fitted');

    this.domService.removeClass(moveElement, 'position--flipped-horizontal');
    this.domService.removeClass(moveElement, 'position--flipped-vertical');

    this.domService.removeClass(moveElement, 'position--fitted-horizontal');
    this.domService.removeClass(moveElement, 'position--fitted-vertical');

    this.domService.removeClass(moveElement, 'position--horizontal-left');
    this.domService.removeClass(moveElement, 'position--horizontal-right');
    this.domService.removeClass(moveElement, 'position--horizontal-center');
    this.domService.removeClass(moveElement, 'position--vertical-top');
    this.domService.removeClass(moveElement, 'position--vertical-bottom');
    this.domService.removeClass(moveElement, 'position--vertical-center');

    this.domService.removeClass(moveElement, 'position--orientation-top-left');
    this.domService.removeClass(moveElement, 'position--orientation-my-position');
  }

  /**
   * Gets the scroll offset point of an element.
   * @param element The element
   */
  getScrollOffsetPoint(element: Element): Point {
    return {
      x: element.scrollLeft,
      y: element.scrollTop,
    };
  }

  /**
   * Gets the visible area of a given element.
   * @param element The element
   */
  getViewableRect(element: HTMLElement): ClientRect {
    const boundingRect = element.getBoundingClientRect();

    const viewableRect = {
      // Inline elements have a clientWidth and clientHeight of zero, so use the values from the bounding client rectangle
      top: boundingRect.top,
      right: boundingRect.right,
      bottom: boundingRect.bottom,
      left: boundingRect.left,
      width: element.clientWidth || boundingRect.width,
      height: element.clientHeight || boundingRect.height,
    };

    // Keep the document element top-left at zero because all calls to element.getBoundingClientRect()
    // are relative to the top-left being zero
    if (element === document.documentElement) {
      viewableRect.top = 0;
      viewableRect.left = 0;
    }

    return viewableRect;
  }

  /**
   * Gets the rectangle for the element to position against.
   * @param domAlignment The DOM alignment
   */
  getToElementRect(domAlignment: DOMAlignment): ClientRect {
    const isDocumentElement = domAlignment.toElement === document.documentElement;
    const isMoveElementFixed = this.domService.isFixed(domAlignment.moveElement);

    // Elements that are positioned "fixed" are positioned inside of the viewable document area
    if (isDocumentElement && isMoveElementFixed) {
      return this.getViewableDocumentRect();
    }

    return this.getViewableRect(domAlignment.toElement);
  }

  /**
   * Gets the rectangle for the visible part of the document.
   */
  getViewableDocumentRect(): ClientRect {
    // Keep the document element top-left at zero because all calls to element.getBoundingClientRect()
    // are relative to the top-left being zero
    return {
      top: 0,
      right: document.documentElement.clientWidth,
      bottom: document.documentElement.clientHeight,
      left: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }

  /**
   * Parses a position. The expected format follows the CSS convention of "horizontal vertical".
   * For example, "left top", where horizontal=left and vertical=top.
   * @param position The position
   * @param defaultPosition The default position
   */
  parsePosition(position: string | Position, defaultPosition?: Position): Position {
    if (!position) {
      return {
        ...{
          horizontal: HorizontalPosition.Center,
          vertical: VerticalPosition.Center,
        },
        ...defaultPosition,
      };
    }

    if (typeof position === 'object') {
      return position;
    }

    const parts = position.toString().split(' ');

    return {
      // Assume CSS convention of width then height
      horizontal: parts[0] ? (parts[0] as HorizontalPosition) : HorizontalPosition.Center,
      vertical: parts[1] ? (parts[1] as VerticalPosition) : VerticalPosition.Center,
    };
  }

  /**
   * Parses a point. The expected format follows the CSS conventionof "x y".
   * For example, "10 5", where x=10 and y=5.
   * @param point The point
   * @param defaultPoint The default point
   */
  parsePoint(point: string | Point, defaultPoint?: Point): Point {
    if (!point) {
      return {
        ...{
          x: 0,
          y: 0,
        },
        ...defaultPoint,
      };
    }

    if (typeof point === 'object') {
      return point;
    }

    const parts = point.toString().split(' ');

    return {
      // Assume CSS convention of x then y
      x: parts[0] ? parseInt(parts[0], 10) : 0,
      y: parts[1] ? parseInt(parts[1], 10) : 0,
    };
  }

  /**
   * Gets an alignment object from a DOM alignment object.
   * @param domAlignment The DOM alignment object
   */
  getAlignment(domAlignment: DOMAlignment): Alignment {
    return {
      moveRect: domAlignment.moveElement.getBoundingClientRect(),
      movePosition: {
        horizontal: domAlignment.movePosition.horizontal,
        vertical: domAlignment.movePosition.vertical,
      },
      toRect: this.getToElementRect(domAlignment),
      toPosition: {
        horizontal: domAlignment.toPosition.horizontal,
        vertical: domAlignment.toPosition.vertical,
      },
      offset: {
        x: domAlignment.offset.x,
        y: domAlignment.offset.y,
      },
      within: this.getViewableRect(domAlignment.within),
      collision: domAlignment.collision,
    };
  }

  /**
   * Gets a DOM alignment object with default values.
   * @param domAlignment The DOM alignment object
   */
  getDOMAlignmentDefaults(domAlignment?: DOMAlignment): DOMAlignment {
    const options = {};

    const defaults = {
      movePosition: {
        vertical: VerticalPosition.Top,
        horizontal: HorizontalPosition.Left,
      },
      toElement: document.documentElement,
      toPosition: {
        vertical: VerticalPosition.Bottom,
        horizontal: HorizontalPosition.Left,
      },
      offset: {
        x: 0,
        y: 0,
      },
      within: document.documentElement,
      collision: CollisionType.None,
      orientation: DOMPositionOrientation.MyPosition,
      appendToBody: true,
      appendTo: document.body,
      enableAppendTo: true,
      zIndex: this.maxZIndex,
    };

    if (domAlignment) {
      Object.keys(domAlignment)
        .filter((key) => domAlignment[key] !== null && domAlignment[key] !== undefined)
        .forEach((key) => (options[key] = domAlignment[key]));
    }

    return cloneDeep({ ...defaults, ...(options as DOMAlignment) });
  }

  /**
   * Gets the DOM sticky alignment defaults.
   * @param domStickyAlignment The DOM sticky alignment
   */
  getDOMStickyAlignmentDefaults(domStickyAlignment?: DOMStickyAlignment): DOMStickyAlignment {
    return {
      throttle: 0,
      enableTransforms: true,
      ...this.getDOMAlignmentDefaults(domStickyAlignment),
    };
  }

  /**
   * Called when the service is destroyed.
   */
  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
