import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'projects/insite-kit/src/service/email/email.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private readonly emailService: EmailService,
    private readonly fb: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      username: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  onForgotPasswordClick() {
    this.loading = true;
    this.emailService.sendForgotPasswordEmail(this.form.value.username).subscribe({
      next: () => {
        this.loading = false;
        this.popupService.success(
          'Email has sucessfully been sent! Please follow the instructions to reset your password.'
        );
        this.navigationService.navigate('/login');
      },
      error: () => {
        this.loading = false;
        this.popupService.error('Could not send email! Please try again later.');
        this.navigationService.navigate('/login');
      },
    });
  }
}
