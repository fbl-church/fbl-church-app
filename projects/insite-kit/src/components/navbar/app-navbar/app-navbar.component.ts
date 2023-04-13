import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { BaseNavbarComponent } from '../base-navbar/base-navbar.component';
@Component({
  selector: 'ik-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent extends BaseNavbarComponent {
  @Input() appName: string;

  constructor(
    router: Router,
    notificationService: NotificationService,
    authService: AuthService,
    jwt: JwtService
  ) {
    super(router, notificationService, authService, jwt);
  }
}
