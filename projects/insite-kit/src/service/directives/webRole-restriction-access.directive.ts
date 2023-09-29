import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { RankedWebRole, WebRole } from '../../model/common.model';
import { UserAccessService } from '../auth/user-access.service';

@Directive({
  selector: '[webRoleRestrictionAccess]',
})
export class WebRoleRestrictionAccessDirective implements OnInit, OnDestroy {
  role: WebRole;
  destroy = new Subject<void>();
  hasPermission: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private readonly userAccessService: UserAccessService
  ) {}

  ngOnInit() {
    this.userAccessService.user$.subscribe((ua) => {
      this.hasPermission =
        Math.max(...ua.rankedRoles.map((r) => Number(RankedWebRole[r]))) >=
        RankedWebRole[this.role];
      this.updateView();
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  @Input() set webRoleRestrictionAccess(value: WebRole) {
    this.role = value;
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
