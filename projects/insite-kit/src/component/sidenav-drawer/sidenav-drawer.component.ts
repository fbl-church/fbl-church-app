import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Access, App, FeatureType } from '../../model/common.model';
import { User } from '../../model/user.model';
import { JwtService } from '../../service/auth/jwt.service';
import { UserAccessService } from '../../service/auth/user-access.service';
import { NavigationService } from '../../service/navigation/navigation.service';
import { SubscriptionService } from '../../subscription/subscription.service';
import { NAVIGATION_ROUTES } from './sidenav-drawer.config';

@Component({
  selector: 'ik-sidenav-drawer',
  templateUrl: 'sidenav-drawer.component.html',
})
export class SidenavDrawerComponent implements OnInit {
  @Output() routed = new EventEmitter<string>();

  navigationConfig = NAVIGATION_ROUTES;
  userData: User;
  initials: string;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly userAccessService: UserAccessService,
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.userAccessService.user$.subscribe((ua) => {
      this.userData = ua.user;
      this.initials = `${this.userData.firstName[0]}${this.userData.lastName[0]}`;
      this.navigationConfig = NAVIGATION_ROUTES.filter((n) => ua.apps.includes(n.id));
    });
  }

  onRoute(path: string) {
    this.routed.emit(path);
    this.navigationService.navigate(path);
  }

  onProfileClick() {
    this.navigationService.navigate('/profile');
  }

  onLogOutClick() {
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
