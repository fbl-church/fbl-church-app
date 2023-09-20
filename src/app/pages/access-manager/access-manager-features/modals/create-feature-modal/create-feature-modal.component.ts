import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ApplicationService } from 'src/service/access-manager/application.service';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-create-feature-modal',
  templateUrl: './create-feature-modal.component.html',
})
export class CreateFeatureModalComponent implements OnInit {
  @ViewChild('createFeatureModal') modal: ModalComponent;

  mappedApplications: any[];
  form: FormGroup;
  modalLoading = false;

  constructor(
    private readonly featureService: FeatureService,
    private readonly applicationService: ApplicationService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.applicationService.get().subscribe((res) => {
      this.mappedApplications = res.body.map((a) => {
        return { name: a.displayName, value: a.id };
      });
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      app: ['', Validators.required],
      feature: ['', Validators.required],
    });
  }

  onCreateFeature() {
    this.modalLoading = true;
    this.featureService
      .create(this.form.value.feature, this.form.value.app.value)
      .subscribe({
        next: (res) => {
          this.modal.close();
          this.popupService.success(`Feature successfully created!`);
          this.router.navigate([`/access-manager/features/${res.id}/details`]);
        },
        error: () => {
          this.popupService.error(`Unable to create feature at this time.`);
          this.modalLoading = false;
        },
      });
  }
}
