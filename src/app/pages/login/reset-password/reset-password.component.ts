import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading = false;
  token: string;
  destroy = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService,
    private readonly jwt: JwtService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();
    this.route.params
      .pipe(
        map((p) => p.id),
        tap((token) => {
          const value = this.jwt.get('passwordReset', token);
          if (value === null || !value) {
            this.navigationService.navigate('/login');
          }
        }),
        catchError(() => {
          this.navigationService.navigate('/login');
          return of(null);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((t) => (this.token = t));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onResetPassword() {
    this.loading = true;

    if (!this.validPassword()) {
      this.loading = false;
      return;
    }

    this.jwt.setToken(this.token);
    this.userService.resetUserPassword({ newPassword: this.form.value.newPassword }).subscribe({
      next: () => {
        this.popupService.success('Password has successfully been reset!');
        this.jwt.removeToken();
        this.navigationService.navigate('/login');
      },
      error: () => {
        this.popupService.error('Could not reset password at this time. Please try again later.');
        this.jwt.removeToken();
        this.navigationService.navigate('/login');
      },
    });
  }

  validPassword() {
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
    return this.form.value.newPassword === this.form.value.confirmPassword;
  }
}
