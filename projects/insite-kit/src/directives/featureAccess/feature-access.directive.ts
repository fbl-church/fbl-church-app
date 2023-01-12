import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Access } from '../../models/common.model';
import { AuthService } from '../../service/auth-service/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .hasAccess(this.app, this.feature, this.type)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((v) => {
        this.hasPermission = v;
        this.updateView();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  @Input() set featureAccess(value: any) {
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
