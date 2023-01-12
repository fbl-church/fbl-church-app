import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { WebRole } from '../../models/common.model';
import { JwtService } from '../../service/jwt-service/jwt.service';

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
    const userRole: number = Number(WebRole[this.jwt.get('webRole')]);
    this.hasPermission = userRole >= Number(this.role);
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
