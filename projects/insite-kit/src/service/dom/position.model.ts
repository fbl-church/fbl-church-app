import { ListenCallback } from './dom.model';
import { AlignmentResult, CollisionResult, CollisionType, Point, Position } from './geometry.model';

export interface DOMAlignment {
  moveElement: HTMLElement;
  movePosition?: Position;
  toElement: HTMLElement;
  toPosition?: Position;
  offset?: Point;
  within?: HTMLElement;
  collision?: CollisionType;
  orientation?: DOMPositionOrientation;
  appendTo?: HTMLElement;
  // Using transforms to offset the position of an element, while smoother and more performant than updating the position,
  // can cause a blurred effect if the offset ends on a fraction of a pixel. This blurred effect can be seen on fonts and
  // the edges of an element and is caused antialiasing as a result by subpixel rendering.
  //
  // NOTE: IE 11 does not use antialiasing for subpixel rendering, so this effect does not happen here.
  //
  // More information can be found at https://keithclark.co.uk/articles/gpu-text-rendering-in-webkit/
  //
  enableTransforms?: boolean;
  enableAppendTo?: boolean;
  zIndex?: number;
  beforeAlign?: (alignmentResult: AlignmentResult) => boolean | void;
}

export enum DOMPositionOrientation {
  TopLeft = 'topLeft',
  MyPosition = 'myPosition',
}

export interface DOMStickyAlignment extends DOMAlignment {
  throttle?: number;
  trackScroll?: Element | string | (() => Element[]);
  scroll?: ListenCallback;
  resize?: ListenCallback;
}

export interface DOMAlignmentResult {
  domAlignment: DOMAlignment;
  collision: CollisionResult;
}
