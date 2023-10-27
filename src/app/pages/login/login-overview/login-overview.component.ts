import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';

@Component({
  selector: 'app-login-overview',
  templateUrl: './login-overview.component.html',
  styleUrls: ['./login-overview.component.scss'],
})
export class LoginOverviewComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly popupService: PopupService
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
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.popupService.error('Invalid email or password!');
        this.loading = false;
      },
    });
  }
}
