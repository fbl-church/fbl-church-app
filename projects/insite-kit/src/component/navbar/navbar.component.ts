import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../service/auth/jwt.service';
import { UserAccessService } from '../../service/auth/user-access.service';
import { SubscriptionService } from '../../subscription/subscription.service';

@Component({
  selector: 'ik-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @Input() appName: string;
  @Input() sideBarOpen: boolean = false;
  @Output() menuClick = new EventEmitter<any>();

  isGuardianOnly = false;

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.userAccessService.user$.subscribe(
      (ua) => (this.isGuardianOnly = ua.isGuardianOnlyUser())
    );
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  onBellClick() {
    this.router.navigate(['/notification']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onLogOutClick() {
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
