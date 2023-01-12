import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { NotificationService } from 'projects/insite-kit/src/service/notification/notification.service';
import { JwtService } from '../../../service/jwt-service/jwt.service';
import { BaseNavbarComponent } from '../base-navbar/base-navbar.component';

@Component({
  selector: 'ik-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent extends BaseNavbarComponent {
  @Input() titleName = "Marc's";

  constructor(
    router: Router,
    notificationService: NotificationService,
    authService: AuthService,
    jwt: JwtService
  ) {
    super(router, notificationService, authService, jwt);
  }
}
