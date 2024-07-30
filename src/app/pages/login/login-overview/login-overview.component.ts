import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { ThemeService } from 'projects/insite-kit/src/service/auth/theme.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
})
export class LoginOverviewComponent implements OnInit {
  form: FormGroup;
  loading = false;

  passwordField = 'password';
  passwordShowIcon = 'eye';
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordField = this.showPassword ? 'text' : 'password';
  }

  onLoginClick() {
    this.loading = true;
    this.authService.authenticate(this.form.value.email, this.form.value.password).subscribe({
      next: (redirect) => {
        this.themeService.setThemeToLoggedInUser();
        this.navigationService.navigate(redirect ? redirect : '/profile');
      },
      error: () => {
        this.popupService.error('Invalid email or password!');
        this.loading = false;
      },
    });
  }

  getEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'Email Address is required';
    }

    return this.form.controls.email.hasError('email') ? 'Email Address is invalid' : '';
  }

  getPasswordErrorMessage() {
    if (this.form.controls.password.hasError('required')) {
      return 'Password is required';
    } else {
      return '';
    }
  }
}
