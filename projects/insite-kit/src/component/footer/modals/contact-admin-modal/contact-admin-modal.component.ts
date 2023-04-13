import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'ik-contact-admin-modal',
  templateUrl: 'contact-admin-modal.component.html',
})
export class ContactAdminModalComponent implements OnInit {
  @ViewChild('contactAdminModal') modal: ModalComponent;

  form: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  reset() {
    this.modal.close();
    this.loading = false;
    this.form.patchValue({ message: '' });
  }
}
