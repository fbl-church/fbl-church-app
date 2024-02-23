import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-create-feature-modal',
  templateUrl: './create-feature-modal.component.html',
})
export class CreateFeatureModalComponent implements OnInit {
  @ViewChild('createFeatureModal') modal: ModalComponent;
  @Input() mappedApplications: any[];

  form: FormGroup;
  modalLoading = false;

  constructor(
    private readonly featureService: FeatureService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      app: ['', Validators.required],
      feature: ['', Validators.required],
    });
  }

  onCreateFeature() {
    this.modalLoading = true;
    this.featureService.create(this.form.value.feature, this.form.value.app.value).subscribe({
      next: (res) => {
        this.modal.close();
        this.popupService.success(`Feature successfully created!`);
        this.navigationService.navigate(`/access-manager/features/${res.id}/details`);
      },
      error: () => {
        this.popupService.error(`Unable to create feature at this time.`);
        this.modalLoading = false;
      },
    });
  }
}
