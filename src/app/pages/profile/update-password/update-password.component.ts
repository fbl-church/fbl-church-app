import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  loading = true;

  form: FormGroup;
  userId: number;
  destroy = new Subject<void>();

  constructor(
    private readonly location: Location,
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
    this.location.back();
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
        this.popupService.success('User password successfully reset!');
        this.location.back();
      },
      error: () => {
        this.popupService.error('Could not reset user password at this time!');
        this.location.back();
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
}
