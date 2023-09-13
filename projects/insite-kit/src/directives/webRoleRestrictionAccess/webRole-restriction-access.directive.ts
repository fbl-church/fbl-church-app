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
import { JwtService } from '../../service/auth/jwt.service';

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
    private jwt: JwtService
  ) {}

  ngOnInit() {
    const userRoles: RankedWebRole[] = this.jwt.getRankedWebRoles();
    this.hasPermission =
      Math.max(...userRoles.map((r) => Number(RankedWebRole[r]))) >=
      RankedWebRole[this.role];
    this.updateView();
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
