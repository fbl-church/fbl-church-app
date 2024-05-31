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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginClick() {
    this.loading = true;
    this.authService.authenticate(this.form.value.username, this.form.value.password).subscribe({
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordField = this.showPassword ? 'text' : 'password';
    this.passwordShowIcon = this.showPassword ? 'eye-slash' : 'eye';
  }
}
