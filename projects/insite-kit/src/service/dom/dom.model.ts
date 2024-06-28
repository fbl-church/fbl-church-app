import { ElementRef } from '@angular/core';

export type ListenCallback = (event: any) => boolean | void;
export type ProjectableContentFilter = (node: any) => boolean;

export type RequiredKeys<T> = { [P in keyof Required<T>]: true };
export interface ComponentElementRef {
  getComponentElement(): ElementRef;
}
