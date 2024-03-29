import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  loading = true;

  form: FormGroup;
  userId: number;
  destroy = new Subject<void>();

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params
      .pipe(
        map((p) => p.id),
        tap((id) => (this.userId = id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.buildForm());
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
    this.loading = false;
  }

  onCancelClick() {
    this.navigationService.back('/profile');
  }

  onResetClick() {
    this.loading = true;

    if (!this.validPassword()) {
      this.loading = false;
      return;
    }

    const passUpdate = {
      newPassword: this.form.value.newPassword,
      currentPassword: this.form.value.currentPassword,
    };

    this.userService.updateUserPassword(passUpdate).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('User password successfully reset!');
      },
      error: () => {
        this.onCancelClick();
        this.popupService.error('Could not reset user password at this time!');
      },
    });
  }

  validPassword() {
    if (this.form.value.currentPassword.toString().trim().length <= 0) {
      this.popupService.error('Current Password is a required field!');
      return false;
    }

    if (!this.passwordsMatch()) {
      this.popupService.error('Passwords do not match!');
      return false;
    }

    if (this.form.value.newPassword.toString().length < 8) {
      this.popupService.error('Password needs to have a length of at least 8 characters.');
      return false;
    }
    return true;
  }

  passwordsMatch(): boolean {
    return this.form.value.newPassword === this.form.value.confirmNewPassword;
  }

  updatePasswordVisibility(type: string) {
    switch (type) {
      case 'currentPassword':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'newPassword':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }
}
