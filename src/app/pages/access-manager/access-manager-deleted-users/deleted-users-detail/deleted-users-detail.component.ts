import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { AccountStatus, User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-deleted-users-detail',
  templateUrl: './deleted-users-detail.component.html',
})
export class DeletedUsersDetailComponent implements OnInit, OnDestroy {
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
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => {
          if (!res.user?.body || res.user.body.accountStatus !== AccountStatus.INACTIVE) {
            this.popupService.warning('Deleted User not found!');
            this.router.navigate(['/access-manager/deleted-users']);
          }
        }),
        tap((res) => (this.userData = res.user.body)),
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
        this.userData.accountStatus = AccountStatus.ACTIVE;
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
    this.router.navigate(['/access-manager/deleted-users']);
  }
}
