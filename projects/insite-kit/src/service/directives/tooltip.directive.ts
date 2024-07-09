import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { DOMService } from '../dom/dom.service';
import { CollisionType } from '../dom/geometry.model';
import { PositionService } from '../dom/position.service';

/**
 * Directive that provides a tooltip to be display when the host element is hovered upon.
 *
 * @example
 * <any [ikTooltip]="content" position="right"></any>
 *
 */
@Directive({
  selector: '[ikTooltip]',
})
export class TooltipDirective implements OnDestroy, OnInit {
  /**
   * The tooltip html content.
   */
  @Input('ikTooltip') tooltipText: string;
  /**
   * Optional position
   */
  @Input('ikTooltipPosition') position = 'right bottom';

  @Input('ikTooltipWrapText') wrapText = false;

  tooltip: HTMLDivElement;
  cancelHide = new Subject<void>();
  destroy = new Subject<void>();

  isShowing = false;

  readonly tooltipOffset = 4;

  constructor(
    private elementRef: ElementRef,
    private domService: DOMService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.create();
    this.listenForShowEvent();
  }

  listenForShowEvent() {
    this.domService
      .fromEvent(this.elementRef, 'mouseenter')
      .pipe(
        tap(() => this.show()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  listenForHideEvent() {
    this.domService
      .fromEvent(this.elementRef, 'mouseleave')
      .pipe(
        delay(0),
        tap(() => this.hide()),
        takeUntil(merge(this.cancelHide, this.destroy))
      )
      .subscribe();
  }

  listenForTooltipEvent() {
    this.domService
      .fromEvent(this.tooltip, 'mouseenter')
      .pipe(
        tap(() => this.cancelHide.next()),
        takeUntil(this.destroy)
      )
      .subscribe();

    this.domService
      .fromEvent(this.tooltip, 'mouseleave')
      .pipe(
        tap(() => this.hide()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.domService.remove(this.tooltip);
  }

  /**
   * Creates the new tooltip html element but does not show it.
   */
  create() {
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('ik-tooltip');
    if (this.wrapText) {
      this.tooltip.classList.add('ik-tooltip--wrap-text');
    }
  }

  /**
   * Show the tooltip
   */
  show() {
    if (!this.tooltip.classList.contains('ik-tooltip--show')) {
      this.isShowing = true;
      this.tooltip.innerHTML = this.tooltipText;
      this.tooltip.classList.add('ik-tooltip--show');
      this.domService.appendChild(document.body, this.tooltip);
      this.setPosition();
      this.listenForTooltipEvent();
      this.listenForHideEvent();
    } else {
      this.isShowing = false;
      this.tooltip.classList.remove('ik-tooltip--show');
    }
  }

  /**
   * Hide the tooltip
   */
  hide() {
    this.isShowing = false;
    this.tooltip.classList.remove('ik-tooltip--show');

    setTimeout(() => {
      if (!this.isShowing) {
        this.domService.remove(this.tooltip);
      }
    }, 1000);
  }

  /**
   * Sets the position of the tooltip relative to the element the directive is attached to.
   */
  setPosition() {
    const alignment = {
      moveElement: this.tooltip,
      toElement: this.elementRef.nativeElement,
      toPosition: this.positionService.parsePosition(this.position),
      collision: CollisionType.Fit,
    };

    this.positionService.align(alignment);
  }
}
