import { Component, HostBinding, OnInit } from '@angular/core';
import { Access, App, FeatureType } from '../../model/common.model';
import { User } from '../../model/user.model';
import { JwtService } from '../../service/auth/jwt.service';
import { UserAccessService } from '../../service/auth/user-access.service';
import { NavigationService } from '../../service/navigation/navigation.service';
import { SubscriptionService } from '../../subscription/subscription.service';
import { NAVIGATION_ROUTES } from './sidebar.config';

@Component({
  selector: 'ik-sidebar',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @HostBinding('class.sidebar-container') hostClass = true;
  @HostBinding('class.sidebar-container--open') sidebarOpenClass = true;
  @HostBinding('class.sidebar-container--closed') sidebarClosedClass = false;

  isOpen = true;
  navigationConfig = NAVIGATION_ROUTES;
  userData: User;
  initials: string;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly userAccessService: UserAccessService,
    private navigationService: NavigationService,
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
    this.navigationService.navigate(path);
    this.close();
  }

  open() {
    this.isOpen = true;
    this.sidebarOpenClass = true;
    this.sidebarClosedClass = false;
  }

  close() {
    this.isOpen = false;
    this.sidebarOpenClass = false;
    this.sidebarClosedClass = true;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  onProfileClick() {
    this.navigationService.navigate('/profile');
  }

  onLogOutClick() {
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
