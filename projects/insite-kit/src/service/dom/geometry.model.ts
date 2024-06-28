export enum HorizontalPosition {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum VerticalPosition {
  Center = 'center',
  Top = 'top',
  Bottom = 'bottom',
}

export interface Position {
  vertical: VerticalPosition;
  horizontal: HorizontalPosition;
}

export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface RectClippedOffset {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RectVisibility {
  topMoreVisible: boolean;
  rightMoreVisible: boolean;
  bottomMoreVisible: boolean;
  leftMoreVisible: boolean;
}

export enum CollisionType {
  None = 'none',
  Flip = 'flip',
  Fit = 'fit',
  FlipThenFit = 'flipThenFit',
}

export interface Alignment {
  moveRect: any;
  movePosition?: Position;
  toRect: any;
  toPosition?: Position;
  offset?: Point;
  within?: any;
  collision?: CollisionType;
}

export enum CollisionResultType {
  Unchanged = 'unchanged',
  Flipped = 'flipped',
  Fitted = 'fitted',
  FlippedThenFitted = 'flippedThenFitted',
}

export interface CollisionPositionResult {
  horizontal: boolean;
  vertical: boolean;
  offset: Point;
}

export interface CollisionResult {
  type: CollisionResultType;
  offset: Point;
  flipped: CollisionPositionResult;
  fitted: CollisionPositionResult;
}

export interface AlignmentResult {
  alignment: Alignment;
  collision: CollisionResult;
}

export interface ClientRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width?: number;
  height?: number;
}
