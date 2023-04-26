import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  loading = true;
  userId: number;
  userUpdating: User;
  destroy = new Subject<void>();

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe((user) => {
      this.userUpdating = user.body;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: User) {
    this.loading = true;

    this.userService
      .updateUserProfile(user)
      .pipe(switchMap(() => this.authService.reauthenticate()))
      .subscribe({
        next: () => {
          this.onCancelClick();
          this.popupService.success('Profile Successfully updated!');
        },
        error: () => {
          this.popupService.error('Profile could not be updated at this time!');
          this.loading = false;
        },
      });
  }
}
