import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Access } from '../../model/common.model';
import { UserAccessService } from '../auth/user-access.service';

@Directive({
  selector: '[featureAccess]',
})
export class FeatureAccessDirective implements OnInit, OnDestroy {
  app: string;
  feature: string;
  type: Access;
  destroy = new Subject<void>();
  hasPermission: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private readonly userAccessService: UserAccessService
  ) {}

  ngOnInit() {
    this.userAccessService.user$
      .pipe(
        filter((u) => !!u),
        map((ua) => ua.hasFeature(this.app, this.feature, this.type)),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe((v) => {
        this.hasPermission = v;
        this.updateView();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  @Input() set featureAccess(value: any[]) {
    this.app = value[0] ? value[0] : '';
    this.feature = value[1] ? value[1] : '';
    this.type = value[2] ? value[2] : Access.CREATE;

    this.updateView();
  }

  private updateView() {
    if (this.hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
