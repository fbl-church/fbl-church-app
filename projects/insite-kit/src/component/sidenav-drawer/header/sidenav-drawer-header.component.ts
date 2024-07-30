import { Component, HostBinding, Input } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { SubscriptionService } from 'projects/insite-kit/src/subscription/subscription.service';

@Component({
  selector: 'ik-sidenav-drawer-header',
  templateUrl: 'sidenav-drawer-header.component.html',
})
export class SidenavDrawerHeaderComponent {
  @HostBinding('class.width--full') hostClass = true;
  @Input() user: User;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  onRoute(path: string) {
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
