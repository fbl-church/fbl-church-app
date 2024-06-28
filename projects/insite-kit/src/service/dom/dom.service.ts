import { ComponentRef, ElementRef, Injectable, Predicate, QueryList, Renderer2, RendererFactory2 } from '@angular/core';
import { NEVER, Observable, fromEvent, merge } from 'rxjs';
import { ComponentElementRef } from './dom.model';
import { Point } from './geometry.model';

/**
 * Service for working with DOM elements.
 */
@Injectable({
  providedIn: 'root',
})
export class DOMService {
  private readonly renderer: Renderer2;
  readonly browserPrefixes = ['ms', 'webkit', 'moz', 'o'];

  constructor(rendererFactory: RendererFactory2) {
    // Renderer2 can only be injected into a component, so it's required to use RendererFactory2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Determines if an element matches a selector.
   * @param selector The selector
   * @param matchesSelector The selector to match
   */
  matches(selector: string | Element | ElementRef, matchesSelector: string | Element | ElementRef): boolean {
    const element = this.querySelector(selector);

    if (!element || !matchesSelector) {
      return false;
    }

    // Use the browser's native "matches" function if a string
    if (typeof matchesSelector === 'string') {
      return element.matches ? element.matches(matchesSelector) : false;
    }

    const matchesElement = this.querySelector(matchesSelector);
    return element === matchesElement;
  }

  /**
   * Gets the parent node of an element.
   * @param selector The selector
   */
  parentNode(selector: Element | ElementRef | string): Element {
    const element = this.querySelector(selector);
    return element ? this.renderer.parentNode(element) : null;
  }

  /**
   * Finds a parent element using a given predicate to find a match.
   * @param selector The starting selector
   * @param predicate The predicate that determines which element matches
   */
  findParent(selector: string | Element | ElementRef, predicate: Predicate<Element>): Element {
    let match;
    let element = this.querySelector(selector);

    if (!element) {
      return null;
    }

    while (this.renderer.parentNode(element)) {
      const parentNode = this.renderer.parentNode(element);

      if (predicate(parentNode)) {
        match = parentNode;
        break;
      }

      element = parentNode;
    }

    return match;
  }

  /**
   * Gets the first (starting at selector) inclusive ancestor that matches matchesSelector, and null otherwise.
   * @param selector The starting selector
   * @param matchesSelector The selector to look for
   */
  closest(selector: Element | ElementRef | string, matchesSelector: string | Element | ElementRef): Element {
    if (!selector || !matchesSelector) {
      return null;
    }

    const element = this.querySelector(selector);

    if (!element) {
      return null;
    }

    // Use the native browser's "closest" function if a string
    if (typeof matchesSelector === 'string') {
      return element.closest(matchesSelector);
    }

    const matchesElement = this.querySelector(matchesSelector);

    if (matchesElement === element) {
      return element;
    }

    return this.findParent(element, (currentParent) => this.matches(currentParent, matchesElement));
  }

  /**
   * Determines if an element matches a selector or if an element has a parent that matches the selector.
   * @param selector The starting selector
   * @param matchesSelector The selector to look for
   */
  matchesOrClosest(selector: Element | ElementRef | string, matchesSelector: string | Element | ElementRef): boolean {
    return this.matches(selector, matchesSelector) || !!this.closest(selector, matchesSelector);
  }

  /**
   * Removes an element from the DOM.
   * @param selector The selector
   */
  remove(selector: Element | ElementRef | string | any): void {
    const element = this.querySelector(selector);

    if (!element) {
      return;
    }

    const parentNode = this.renderer.parentNode(element);
    this.renderer.removeChild(parentNode, element);
  }

  /**
   * Removes a list of component element references from the DOM.
   * @param refs The component element references
   */
  removeComponentElementRefs(refs: QueryList<ComponentElementRef> | ComponentElementRef[]): void {
    if (!refs) {
      return;
    }

    refs.forEach((ref) => this.remove(ref.getComponentElement()));
  }

  /**
   * Finds an offset parent using a given predicate to find a match.
   * @param selector The starting selector
   * @param predicate The predicate that determines which element matches
   */
  findOffsetParent(selector: Element | ElementRef | string, predicate: Predicate<Element>): HTMLElement {
    let element = this.querySelector(selector) as HTMLElement;

    if (!element) {
      return null;
    }

    let offsetParent = null;

    while (element.offsetParent) {
      if (predicate(element.offsetParent)) {
        offsetParent = element.offsetParent;
        break;
      }

      element = element.offsetParent as HTMLElement;

      // Include the 'HTML' element in the search
      if (!element.offsetParent && predicate(document.documentElement)) {
        offsetParent = document.documentElement;
        break;
      }
    }

    return offsetParent;
  }

  /**
   * Determines if an element is in the normal page flow (i.e., if it's position is "static" or "relative").
   * @param selector The selector
   */
  isInNormalPageFlow(selector: Element | ElementRef | string): boolean {
    const element = this.querySelector(selector);

    if (!element) {
      return false;
    }

    const style = this.getComputedStyle(element);
    return style.position === 'static' || style.position === 'relative' || style.position === 'sticky';
  }

  /**
   * Determines if an element is positioned static.
   * @param selector The selector
   */
  isStatic(selector: Element | ElementRef | string): boolean {
    const element = this.querySelector(selector);

    if (!element) {
      return false;
    }

    const style = this.getComputedStyle(element);
    return style.position === 'static';
  }

  /**
   * Determines if an element has a style of position 'fixed'.
   * @param selector The selector
   */
  isFixed(selector: Element | ElementRef | string): boolean {
    const element = this.querySelector(selector);

    if (!element) {
      return false;
    }

    return this.getComputedStyle(element).position === 'fixed';
  }

  /**
   * Determines if an element will display scrollbars when its content overflows.
   * @param selector The selector
   */
  isScrollable(selector: Element | ElementRef | string): boolean {
    const element = this.querySelector(selector);

    if (!element) {
      return false;
    }

    const overflow = this.getComputedStyle(element).overflow;
    // Use 'indexOf' because 'x' and 'y' scroll values can appear separated by a space like 'hidden auto'
    return overflow.indexOf('auto') >= 0 || overflow.indexOf('scroll') >= 0;
  }

  /**
   * Gets an object containing the values of all CSS properties of an element, after applying active stylesheets and
   * resolving any basic computation those values may contain.
   * @param selector The selector
   */
  getComputedStyle(selector: Element | ElementRef | string): CSSStyleDeclaration {
    const element = this.querySelector(selector);
    return window.getComputedStyle(element);
  }

  /**
   * Gets the bounding client rectangle of an element.
   * @param selector The selector
   */
  getBoundingClientRect(selector: Element | ElementRef | string): DOMRect {
    const element = this.querySelector(selector);
    return element ? element.getBoundingClientRect() : null;
  }

  /**
   * Sets multiple styles on a given element.
   * @param selector The the selector
   * @param styles The styles
   */
  setStyles(selector: Element | ElementRef | string, styles: { [x: string]: any }): void {
    const element = this.querySelector(selector);

    Object.keys(styles).forEach((style) => {
      this.renderer.setStyle(element, style, styles[style]);
    });
  }

  /**
   * Updates the CSS class on an element.
   * @param selector The selector
   * @param className The class name
   * @param addClass True to add the class; false to remove the class
   */
  updateClass(selector: Element | ElementRef | string, className: string, addClass = true): void {
    const method = addClass ? 'addClass' : 'removeClass';
    this[method](selector, className);
  }

  /**
   * Adds a CSS class to an element.
   * @param selector The selector
   * @param name The class name
   */
  addClass(selector: Element | ElementRef | string, name: string) {
    const element = this.querySelector(selector);

    if (element) {
      this.renderer.addClass(element, name);
    }
  }

  /**
   * Removes a CSS class to an element.
   * @param selector The selector
   * @param name The class name
   */
  removeClass(selector: Element | ElementRef | string, name: string) {
    const element = this.querySelector(selector);

    if (element) {
      this.renderer.removeClass(element, name);
    }
  }

  /**
   * Finds an offset parent element that has a style of position 'fixed'.
   * @param element The element
   */
  findFixedOffsetParent(element: HTMLElement): HTMLElement {
    return this.findOffsetParent(element, (parent) => this.isFixed(parent));
  }

  /**
   * Finds an offset parent element that will show scroll bars if when its content overflows.
   * @param element The element
   */
  findScrollableOffsetParent(element: HTMLElement): HTMLElement {
    return this.findOffsetParent(element, (parent) => this.isScrollable(parent));
  }

  /**
   * Listens for an event on an element. If the target is document.documentElement (the HTML element), then the
   * Window object is used because events on the document.documentElement fire on the Window object.
   * @param target The context in which to listen for events. Can be
   * the entire window or document, the body of the document, or a specific
   * DOM element.
   * @param eventName The event to listen for.
   * @param options Options for the event subscription.
   */
  fromEvent<T>(target: any, eventName: string, options?: EventListenerOptions): Observable<T> {
    if (!target) {
      return NEVER;
    }

    let events;

    if (Array.isArray(target)) {
      events = target.map((t) => this.fromEvent(t, eventName));
      return merge.apply(merge, events);
    }

    target = this.querySelector(target);

    if (target instanceof HTMLElement) {
      // Events for the documentElement (the HTML element) fire on the window object
      target = target === document.documentElement ? window : target;
    }

    const eventNames = eventName.split(',');
    events = eventNames.map((name) => fromEvent<T>(target, name));

    return merge.apply(merge, events);
  }

  /**
   * Gets the supported name of a given style, using a list of known browser prefixes to check for support.
   * @param style The style
   */
  getSupportedStyle(style: string): string {
    if (this.supportsStyle(style)) {
      return style;
    }

    const pascalStyle = style[0].toUpperCase() + style.substr(1);

    return this.browserPrefixes
      .map((prefix) => `${prefix}${pascalStyle}`)
      .filter((browserStyle) => this.supportsStyle(browserStyle))[0];
  }

  /**
   * Determines if a given style is supported by the browser.
   * @param style The style
   */
  supportsStyle(style: string): boolean {
    return document.body.style[style] !== undefined;
  }

  /**
   * Selects an element.
   * @param selector The selector
   * @param childSelector The optional child selector to use to query elements within the "selector" argument
   */
  querySelector(selector: string | Element | ElementRef, childSelector?: string | Element | ElementRef): Element {
    if (!selector) {
      return null;
    }

    if (selector['nativeElement']) {
      return selector['nativeElement'];
    }

    const parentNode = this.querySelector(childSelector) || document;
    return typeof selector === 'string' ? parentNode.querySelector(selector) : (selector as Element);
  }

  /**
   * Selects multiple elements.
   * @param selector The selector
   */
  querySelectorAll(selector: string | NodeListOf<Element> | QueryList<ElementRef>): NodeListOf<Element> {
    if (selector['toArray']) {
      return selector['toArray']();
    }

    return typeof selector === 'string' ? document.querySelectorAll(selector) : (selector as NodeListOf<Element>);
  }

  /**
   * Determines if an element is visible.
   * @param selector The selector
   */
  isVisible(selector: string | Element | ElementRef): boolean {
    const element = this.querySelector(selector);
    return element ? this.getComputedStyle(element).display !== 'none' : false;
  }

  /**
   * Hides an element.
   * @param selector The selector
   */
  hide(selector: string | Element | ElementRef): void {
    const element = this.querySelector(selector);

    if (element) {
      this.renderer.setStyle(element, 'display', 'none');
    }
  }

  /**
   * Shows an element.
   * @param selector The selector
   */
  show(selector: string | Element | ElementRef): void {
    const element = this.querySelector(selector);

    if (element) {
      this.renderer.setStyle(element, 'display', '');
    }
  }

  /**
   * Toggles the visibility of an element.
   * @param selector The selector
   */
  toggleVisibility(selector: string | Element | ElementRef): void {
    const element = this.querySelector(selector);

    if (!element) {
      return;
    }

    const method = this.isVisible(element) ? 'hide' : 'show';
    this[method](element);
  }

  /**
   * Inserts a child node at a given position in a parent node in the host element DOM.
   * @param parent The parent node.
   * @param newChild The new child nodes.
   * @param refChild The existing child node that should precede the new node.
   */
  insertBefore(
    parent: string | Element | ElementRef,
    newChild: string | Element | ElementRef,
    refChild: string | Element | ElementRef
  ): void {
    parent = this.querySelector(parent);
    newChild = this.querySelector(newChild);
    refChild = this.querySelector(refChild);

    if (parent && newChild) {
      this.renderer.insertBefore(parent, newChild, refChild);
    }
  }

  /**
   * Appends a child to a given parent node in the host element DOM.
   * @param parent The parent node.
   * @param newChild The new child node.
   */
  appendChild(parent: string | Element | ElementRef, newChild: string | Element | ElementRef): void {
    parent = this.querySelector(parent);
    newChild = this.querySelector(newChild);

    if (parent && newChild) {
      this.renderer.appendChild(parent, newChild);
    }
  }

  /**
   * Inserts a component at a given position in a parent node.
   * @param componentRef The component reference
   * @param parent The parent selector
   * @param refChild The the existing child node to insert the component before. If this is null, the component is
   * appended to the end.
   *
   */
  insertComponentBefore<T>(
    componentRef: ComponentRef<T>,
    parent: string | Element | ElementRef,
    refChild?: string | Element | ElementRef
  ): void {
    parent = this.querySelector(parent);
    refChild = this.querySelector(refChild);

    if (componentRef && parent) {
      // Add the component's root element to the DOM (if refChild is null then the element is appended at the end)
      this.renderer.insertBefore(parent, componentRef.location.nativeElement, refChild);
    }
  }

  /**
   * Appends a component to a parent node.
   * @param componentRef The component reference
   * @param parent The parent selector
   */
  appendComponent<T>(componentRef: ComponentRef<T>, parent: string | Element | ElementRef): void {
    parent = this.querySelector(parent);
    this.insertComponentBefore(componentRef, parent);
  }

  /**
   * Remove a component from the DOM.
   * @param componentRef The component reference
   */
  removeComponent<T>(componentRef: ComponentRef<T>): void {
    if (componentRef) {
      this.remove(componentRef.location);
    }
  }

  /**
   * Applies the translate3d transform, at a given point, to an element. It's more efficient to use CSS translate3d for
   * the offset instead of updating the left/top. Offsetting an element this way prevents the browser from doing layout
   * related calculations for the entire document Also, using translate3d ensures the GPU acceleration is used.
   * @param selector The selector
   * @param offsetPoint The offset point
   */
  translate3d(selector: string | Element | ElementRef, offsetPoint: Point): void {
    const element = this.querySelector(selector);

    if (!element) {
      return;
    }

    const transformStyle = this.getSupportedStyle('transform');
    const value = `translate3d(${offsetPoint.x}px, ${offsetPoint.y}px, ${offsetPoint.z || 0}px)`;

    // It's more efficient to use CSS translate3d for the offset instead of updating the left/top. This is because
    // every time the left/top are updated the browser has to do layout related calculations for the entire document.
    // Also, translate3d ensures the browser is using GPU acceleration.
    this.renderer.setStyle(element, transformStyle, value);
  }

  /**
   * Gets the point that represents the offset from the applied translate3d function.
   * @param selector The selector
   */
  getTranslate3dPoint(selector: string | Element | ElementRef): Point {
    const transformStyleName = this.getSupportedStyle('transform');
    const transformMatrix = this.getComputedStyle(selector)[transformStyleName];

    if (!transformMatrix) {
      return {
        x: 0,
        y: 0,
      };
    }

    const matrixCommaSeparatedNumbers = transformMatrix.replace(/matrix|\(|\)/gi, '');
    const matrixParts = matrixCommaSeparatedNumbers.split(',');

    return {
      x: parseFloat(matrixParts[matrixParts.length - 2]),
      y: parseFloat(matrixParts[matrixParts.length - 1]),
    };
  }

  applyTranslate3d(selector: string | Element | ElementRef): void {}

  /**
   * Determines if an element has a CSS transition applied to a given element.
   * @param selector The selector
   */
  isTransitionEnabled(selector: string | Element | ElementRef): boolean {
    const style = this.getComputedStyle(selector);
    return style.transitionDuration !== '0s' || style.transitionDelay !== '0s';
  }

  /**
   * Determines if an element has a CSS animation applied to a given element.
   * @param selector The selector
   */
  isAnimationEnabled(selector: string | Element | ElementRef): boolean {
    const style = this.getComputedStyle(selector);
    return style.animationDuration !== '0s' || style.animationDelay !== '0s';
  }
}
