import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  loading = true;

  form: FormGroup;
  userId: number;
  destroy = new Subject<void>();

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
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.loading = false;
  }

  onCancelClick() {
    this.onBackClick();
  }

  onBackClick() {
    this.navigationService.back();
  }

  onResetClick() {
    this.loading = true;

    if (!this.validPassword()) {
      this.loading = false;
      return;
    }

    const passUpdate = { newPassword: this.form.value.password };
    this.userService.updateUserPasswordById(this.userId, passUpdate).subscribe({
      next: () => {
        this.popupService.success('User password successfully reset!');
        this.navigationService.navigate(`/users/${this.userId}/details`, false);
      },
      error: () => {
        this.popupService.error('Could not reset user password at this time!');
        this.loading = false;
      },
    });
  }

  validPassword() {
    if (!this.passwordsMatch()) {
      this.popupService.error('Passwords do not match!');
      return false;
    }

    if (this.form.value.password.toString().length < 8) {
      this.popupService.error('Password needs to have a length of at least 8 characters.');
      return false;
    }
    return true;
  }

  passwordsMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
