import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../service/auth/jwt.service';
import { UserAccessService } from '../../service/auth/user-access.service';
import { CommonService } from '../../service/common/common.service';
import { SubscriptionService } from '../../subscription/subscription.service';
import { NavbarProfileContentComponent } from './navbar-profile-content/navbar-profile-content.component';

@Component({
  selector: 'ik-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @ViewChild(NavbarProfileContentComponent)
  profileContent: NavbarProfileContentComponent;
  @Input() appName: string;
  @Input() sideBarOpen: boolean = false;
  @Output() menuClick = new EventEmitter<any>();

  isGuardianOnly = false;
  name: string;
  email: string;

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService,
    private readonly subscriptionService: SubscriptionService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.name = this.commonService.getFormattedName({
      firstName: this.jwt.get('firstName'),
      lastName: this.jwt.get('lastName'),
    });
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
    this.profileContent.toggle();
  }

  onLogOutClick() {
    this.subscriptionService.disconnect();
    this.jwt.logOut();
  }
}
