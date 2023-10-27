import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-create-application-modal',
  templateUrl: './create-application-modal.component.html',
})
export class CreateApplicationModalComponent implements OnInit {
  @ViewChild('createApplicationModal') modal: ModalComponent;

  form: FormGroup;
  modalLoading = false;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      key: ['', Validators.required],
      displayName: ['', Validators.required],
    });
  }

  onCreateApplication() {
    this.modalLoading = true;
    this.applicationService
      .create({
        key: this.form.value.key,
        displayName: this.form.value.displayName,
      })
      .subscribe({
        next: (res) => {
          this.modal.close();
          this.popupService.success(`Application successfully created!`);
          this.router.navigate([`/access-manager/applications/${res.id}/details`]);
        },
        error: () => {
          this.popupService.error(`Unable to create Application at this time.`);
          this.modalLoading = false;
        },
      });
  }
}
