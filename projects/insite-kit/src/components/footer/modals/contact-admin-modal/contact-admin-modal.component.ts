import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'projects/insite-kit/src/service/email-service/email.service';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'ik-contact-admin-modal',
  templateUrl: './contact-admin-modal.component.html',
  styleUrls: ['./contact-admin-modal.component.scss'],
})
export class ContactAdminModalComponent implements OnInit {
  @ViewChild('contactAdminModal') modal: ModalComponent;

  form: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly emailService: EmailService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  sendMessage() {
    this.loading = true;
    this.emailService.sendContactAdminEmail(this.form.value.message).subscribe({
      next: () => {
        this.reset();
        this.popupService.success(
          'Email successfully sent! We will get back to you as soon as possible!'
        );
      },
      error: () => {
        this.reset();
        this.popupService.error(
          'Email could not be sent at this time! Please try again later.'
        );
      },
    });
  }

  reset() {
    this.modal.close();
    this.loading = false;
    this.form.patchValue({ message: '' });
  }
}
