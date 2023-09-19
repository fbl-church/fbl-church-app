import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
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

  constructor(
    private userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly router: Router,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.activeRoute.data
      .pipe(
        tap((res) => (this.userData = res.user.body)),
        tap(
          () =>
            (this.canEditRoles =
              Number(this.jwt.get('userId')) !== this.userData.id)
        ),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load user details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onDeleteUser() {
    this.loading = true;
    this.userService.delete(this.userData.id).subscribe({
      next: () => {
        this.popupService.success('User Successfully Deleted!');
        this.router.navigate(['/users']);
        this.loading = false;
      },
      error: () => {
        this.popupService.success(
          'Unable to delete user at this time. Try again later'
        );
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
