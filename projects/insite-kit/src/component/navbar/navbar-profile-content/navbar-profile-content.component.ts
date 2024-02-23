import { Component, OnInit } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { SubscriptionService } from 'projects/insite-kit/src/subscription/subscription.service';

@Component({
  selector: 'ik-navbar-profile-content',
  templateUrl: 'navbar-profile-content.component.html',
})
export class NavbarProfileContentComponent implements OnInit {
  initials: string;
  name: string;
  email: string;

  isOpen = false;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly subscriptionService: SubscriptionService,
    private readonly commonService: CommonService
  ) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.name = this.commonService.getFormattedName({
      firstName: this.jwt.get('firstName'),
      lastName: this.jwt.get('lastName'),
    });
    this.initials = `${this.jwt.get('firstName')[0]}${this.jwt.get('lastName')[0]}`;
    this.email = this.jwt.get('email');
  }

  onProfileClick() {
    this.close();
    this.navigationService.navigate('/profile');
  }

  onScheduleClick() {
    this.close();
    this.navigationService.navigate('/profile/schedule');
  }

  onLogOutClick() {
    this.close();
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
