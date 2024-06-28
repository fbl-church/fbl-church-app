import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { EmailService } from 'projects/insite-kit/src/service/email/email.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
})
export class ResetPasswordModalComponent {
  @ViewChild('resetPasswordModal') modal: ModalComponent;
  @Input() userId: number;
  @Input() email: string;

  modalLoading = false;

  constructor(
    private readonly userService: UserService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly emailService: EmailService
  ) {}

  open() {
    this.modal.open();
  }

  onResetUserPassword() {
    this.modal.close();
    this.navigationService.navigate(`/users/${this.userId}/details/reset-password`);
  }

  onSendForgotPasswordEmail() {
    this.modalLoading = true;
    this.emailService.sendForgotPasswordEmail(this.email).subscribe({
      next: () => {
        this.popupService.success(`Forgot Password Email Successfully sent to '${this.email}'`);
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error('Unable to send forgot password email. Try again later.');
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }
}
