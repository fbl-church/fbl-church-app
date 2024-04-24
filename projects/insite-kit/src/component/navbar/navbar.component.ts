import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { JwtService } from '../../service/auth/jwt.service';
import { UserAccessService } from '../../service/auth/user-access.service';
import { NavigationService } from '../../service/navigation/navigation.service';
import { SubscriptionService } from '../../subscription/subscription.service';
import { NavbarProfileContentComponent } from './navbar-profile-content/navbar-profile-content.component';

@Component({
  selector: 'ik-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @HostBinding('class.app-navbar') hostClass = true;
  @ViewChild(NavbarProfileContentComponent)
  profileContent: NavbarProfileContentComponent;
  @Input() appName: string;
  @Input() sideBarOpen: boolean = false;

  @Output() menuClick = new EventEmitter<any>();

  isGuardianOnly = false;
  email: string;
  authenticated = false;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.authenticated = this.jwt.isAuthenticated();
    if (this.authenticated) {
      this.userAccessService.user$.subscribe((ua) => (this.isGuardianOnly = ua.isGuardianOnlyUser()));
    }
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  onBellClick() {
    this.navigationService.navigate('/notification');
  }

  onProfileClick() {
    this.profileContent.toggle();
  }

  onLogOutClick() {
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
