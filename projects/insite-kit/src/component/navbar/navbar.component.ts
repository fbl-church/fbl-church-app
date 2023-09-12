import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtService } from '../../service/auth/jwt.service';
import { SubscriptionService } from '../../subscription/subscription.service';

@Component({
  selector: 'ik-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnDestroy {
  @Input() appName: string;
  @Input() sideBarOpen: boolean = false;
  @Output() menuClick = new EventEmitter<any>();

  destroy = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  ngOnDestroy() {
    this.destroy.next();
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
