import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { DOMService } from './dom.service';
import {
  AlignmentResult,
  CollisionType,
  HorizontalPosition,
  Point,
  Position,
  VerticalPosition,
} from './geometry.model';
import { DOMAlignmentResult, DOMPositionOrientation, DOMStickyAlignment } from './position.model';
import { PositionService } from './position.service';

@Directive({
  selector: '[lkPosition]',
})
export class PositionDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input('lkPosition') target: ElementRef | HTMLElement | string;
  @Input('lkPositionAt') at: Position | string;
  @Input('lkPositionMy') my: Position | string;
  @Input('lkPositionWithin') within: ElementRef | HTMLElement | string;
  @Input('lkPositionCollision') collision: CollisionType;
  @Input('lkPositionOrientation') orientation: DOMPositionOrientation;
  @Input('lkPositionOffset') offset: Point | string;
  @Input('lkPositionZIndex') zIndex: number;
  @Input('lkPositionEnableAppendTo') enableAppendTo: boolean;
  @Input('lkPositionAppendTo') appendTo: ElementRef | HTMLElement | string;
  @Input('lkPositionSticky') sticky: boolean;
  @Input('lkPositionEnableTransforms') enableTransforms: boolean;
  @Input('lkPositionThrottle') throttle: number;
  @Input('lkPositionEnabled') enabled = true;
  @Input('lkPositionDebounce') updateDebounce = 300;
  @Input('lkPositionTrackScroll') trackScroll: () => Element[] | ElementRef | HTMLElement | string;

  @Output() beforeUpdatePosition: EventEmitter<AlignmentResult> = new EventEmitter<AlignmentResult>();
  @Output() afterUpdatePosition: EventEmitter<DOMAlignmentResult> = new EventEmitter<DOMAlignmentResult>();

  didInitialAlignment = false;
  initPosition: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  stickyAlignActive = false;
  updateDebounceSubject = new Subject<void>();

  private readonly stopStickyAlign = new Subject<void>();
  private readonly destroy = new Subject<void>();

  constructor(private element: ElementRef, private domService: DOMService, private positionService: PositionService) {}

  /**
   * Called after the view is initialized.
   */
  ngAfterViewInit(): void {
    this.positionService.addClasses(this.getDOMAlignment());
    // Setup debounced update calls
    this.updateDebounceSubject
      .pipe(debounceTime(this.updateDebounce), takeUntil(this.destroy))
      .subscribe(() => this.resetAndUpdate());

    // Allow other components to know when this directive is initialized (for example, to disable the directive)
    this.initPosition.next(true);
    this.update();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Don't process changes until after ngOnInit calls the initial update.
    // This speeds up the initial render by skipping unnecessary calls to update the position.
    if (!this.didInitialAlignment) {
      return;
    }

    this.reset();
    // Debounce updates to prevent too many calls to update the alignment (especially before the directive initializes)
    this.updateDebounceSubject.next();
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * after a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.removeSticky();
    this.positionService.removeClasses(this.getDOMAlignment());
  }

  /**
   * Resets the position information so the next update performs the initial alignment.
   */
  reset(): void {
    // Rerun the initial alignment with the updated values
    this.didInitialAlignment = false;
    // Remove the sticky so that it can be realigned with the new alignment values
    this.removeSticky();
  }

  /**
   * Resets the position information and updates the position of the element.
   */
  resetAndUpdate(): void {
    this.reset();
    this.update();
  }

  /**
   * Enables the directive and updates the position.
   */
  enable(): void {
    this.enabled = true;
    this.update();
  }

  /**
   * Disables the directive, and removes sticky alignment if sticky is enabled.
   */
  disable(): void {
    this.enabled = false;
    this.reset();
  }

  /**
   * Aligns the element to the target element.
   */
  align(): void {
    const domAlignment = this.getDOMAlignment();
    // Use the update alignment method for better performance if the initial alignment was already done
    const alignMethod = this.didInitialAlignment ? 'alignUpdate' : 'align';
    const result = this.positionService[alignMethod](domAlignment);
    this.onAfterAlign(result);
  }

  /**
   * Aligns an element to another element and sticks the source element to the target element. When the
   * target element moves, either via scrolling or window resizing, the source element follows it.
   */
  stickyAlign(): void {
    if (this.stickyAlignActive) {
      this.align();
    } else {
      this.stickyAlignActive = true;
      const domAlignment = this.getDOMAlignment();

      this.positionService
        .stickyAlign(domAlignment)
        .pipe(
          finalize(() => (this.stickyAlignActive = false)),
          takeUntil(merge(this.destroy, this.stopStickyAlign))
        )
        .subscribe((result) => this.onAfterAlign(result));
    }
  }

  /**
   * Updates the position of the element.
   */
  update(): void {
    if (!this.enabled || !this.target) {
      return;
    }

    if (this.sticky !== false) {
      this.stickyAlign();
    } else {
      this.align();
    }
  }

  /**
   * Callback for after the alignment is finished.
   * @param result The result of the alignment
   */
  onAfterAlign(result: DOMAlignmentResult): void {
    this.afterUpdatePosition.emit(result);
    this.didInitialAlignment = true;
  }

  /**
   * Removes the sticky alignment.
   */
  removeSticky(): void {
    this.stopStickyAlign.next();
    this.stickyAlignActive = false;
  }

  /**
   * Gets the alignment objects from the input properties.
   */
  getDOMAlignment(): DOMStickyAlignment {
    return {
      moveElement: this.element.nativeElement,
      movePosition: this.positionService.parsePosition(this.my, {
        horizontal: HorizontalPosition.Left,
        vertical: VerticalPosition.Top,
      }),
      toElement: this.domService.querySelector(this.target) as HTMLElement,
      toPosition: this.positionService.parsePosition(this.at, {
        horizontal: HorizontalPosition.Left,
        vertical: VerticalPosition.Bottom,
      }),
      offset: this.positionService.parsePoint(this.offset),
      within: this.within ? (this.domService.querySelector(this.within) as HTMLElement) : null,
      collision: this.collision,
      orientation: this.orientation,
      appendTo: this.domService.querySelector(this.appendTo) as HTMLElement,
      enableAppendTo: this.enableAppendTo,
      zIndex: this.zIndex,
      throttle: this.throttle,
      enableTransforms: this.enableTransforms,
      trackScroll:
        this.trackScroll instanceof Function
          ? this.trackScroll
          : (this.domService.querySelector(this.trackScroll) as any),
      beforeAlign: (alignmentResult) => this.beforeUpdatePosition.emit(alignmentResult),
    };
  }
}
