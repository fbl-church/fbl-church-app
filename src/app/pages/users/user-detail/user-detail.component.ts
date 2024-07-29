import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { AccountStatus, User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

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
  WebRole = WebRole;
  editIcon = faPenToSquare;
  canEditRoles = false;
  canEditUser = false;

  destroy = new Subject<void>();
  qrCodeUrl = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => {
          if (!res.user?.body || res.user.body.accountStatus !== AccountStatus.ACTIVE) {
            this.popupService.warning('User not found or is Inactive!');
            this.navigationService.navigate('/users');
          }
        }),
        tap((res) => (this.userData = res.user.body)),
        switchMap(() => this.userAccessService.user$),
        tap((ua) => (this.canEditUser = ua.canEditUser(this.userData.webRole))),
        tap(() => (this.canEditRoles = Number(this.jwt.getUserId()) !== this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back('/users');
  }

  onEditClick() {
    this.navigationService.navigate(`/users/${this.userData.id}/details/edit`);
  }
}
