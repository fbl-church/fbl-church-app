import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { Guardian, User } from 'projects/insite-kit/src/model/user.model';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  loading = true;
  userId: number;
  userUpdating: User | Guardian;
  destroy = new Subject<void>();
  isGuardianUser = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly guardianService: GuardianService,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.userUpdating = res.currentUser.body)),
        tap(() => (this.isGuardianUser = this.userUpdating.webRole.includes(WebRole.GUARDIAN))),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.location.back();
  }

  onSaveClick(user: User | Guardian) {
    this.loading = true;

    let updateObservable = this.userService.updateUserProfile(user);
    if (this.isGuardianUser) {
      updateObservable = this.guardianService.updateProfile(this.jwt.getUserId(), user);
    }

    updateObservable.pipe(switchMap(() => this.authService.reauthenticate())).subscribe({
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
