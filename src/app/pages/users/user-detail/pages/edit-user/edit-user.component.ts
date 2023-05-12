import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  userId: number;
  userUpdating: User;
  currentUpdatedInfo: User;
  disableWebRoleUpdate = false;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user.body),
        tap((res) => (this.userId = res.id)),
        tap(
          () =>
            (this.disableWebRoleUpdate =
              Number(this.jwt.get('userId')) === this.userId)
        ),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
        this.userUpdating = user;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.resetStatus();
    this.location.back();
  }

  onSaveClick(user: User) {
    this.userService.updateUserProfileById(this.userId, user).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('User Successfully updated!');
      },
      error: () => {
        this.popupService.error('User could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
