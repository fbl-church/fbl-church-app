import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UrlService } from 'projects/insite-kit/src/service/url-service/url.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userData: User;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  editIcon = faPenToSquare;
  canEditRoles = false;

  destroy = new Subject<void>();
  qrCodeUrl = '';

  constructor(
    private userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly router: Router,
    private readonly jwt: JwtService,
    private readonly urlService: UrlService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => {
          if (!res.user) {
            this.popupService.warning('User not found!');
            this.router.navigate(['/users']);
          }
        }),
        tap((res) => (this.userData = res.user.body)),
        tap(() => (this.canEditRoles = Number(this.jwt.getUserId()) !== this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  restoreUser() {
    this.loading = true;
    this.userService.restore(this.userData.id).subscribe({
      next: () => {
        this.popupService.success('User Successfully Restored!');
        this.userData.accountStatus = 'ACTIVE';
        this.userData.appAccess = true;
        this.loading = false;
      },
      error: () => {
        this.popupService.error('Unable to restore user at this time. Try again later');
        this.loading = false;
      },
    });
  }

  onBackClick() {
    this.router.navigate(['/users']);
  }

  onEditClick() {
    this.router.navigate([`/users/${this.userData.id}/details/edit`]);
  }

  onResetPassword() {
    this.router.navigate([`/users/${this.userData.id}/details/reset-password`]);
  }
}
