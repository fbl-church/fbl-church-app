import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import {
  CRUD,
  WebRoleFeature,
} from 'projects/insite-kit/src/model/access.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-web-role-feature-update-modal',
  templateUrl: './web-role-feature-update-modal.component.html',
})
export class WebRoleFeatureUpdateModalComponent {
  @ViewChild('webRoleFeatureUpdateModal') modal: ModalComponent;
  @ViewChild('fieldCreate') createField: CheckboxComponent;
  @ViewChild('fieldRead') readField: CheckboxComponent;
  @ViewChild('fieldUpdate') updateField: CheckboxComponent;
  @ViewChild('fieldDelete') deleteField: CheckboxComponent;
  @Output() webRoleFeatureUpdate = new EventEmitter<void>();

  webRoleFeature: WebRoleFeature;

  modalLoading = false;

  constructor(
    private readonly featureService: FeatureService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  open(data: WebRoleFeature) {
    if (this.webRoleFeature) {
      this.createField.checked = data.create;
      this.readField.checked = data.read;
      this.updateField.checked = data.update;
      this.deleteField.checked = data.delete;
    }
    this.webRoleFeature = data;
    this.modal.open();
  }

  onUpdateWebRoleFeature() {
    this.modalLoading = true;
    const crudData: CRUD = {
      create: this.createField.checked,
      read: this.readField.checked,
      update: this.updateField.checked,
      delete: this.deleteField.checked,
    };
    this.featureService
      .updateWebRoleFeatureAccess(
        this.webRoleFeature.featureId,
        this.webRoleFeature.webRole,
        crudData
      )
      .subscribe({
        next: () => {
          this.modal.close();
          this.modalLoading = false;
          this.webRoleFeatureUpdate.emit();
          this.popupService.success(
            `${this.webRoleFeature.webRole} feature access successfully updated`
          );
        },
        error: () => {
          this.popupService.error(
            `Unable to update feature access for web role '${this.webRoleFeature.webRole}' at this time.`
          );
          this.modalLoading = false;
        },
      });
  }
}
