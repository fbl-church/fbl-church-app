import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WebRoleApp } from 'projects/insite-kit/src/model/access.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-web-role-app-update-modal',
  templateUrl: './web-role-app-update-modal.component.html',
})
export class WebRoleAppUpdateModalComponent {
  @ViewChild('webRoleAppUpdateModal') modal: ModalComponent;
  @ViewChild('accessField') accessField: CheckboxComponent;
  @Output() webRoleAppUpdate = new EventEmitter<void>();

  webRoleApp: WebRoleApp;

  modalLoading = false;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  open(data: WebRoleApp) {
    if (this.webRoleApp) {
      this.accessField.checked = data.access;
    }
    this.webRoleApp = data;
    this.modal.open();
  }

  onUpdateWebRoleApp() {
    this.modalLoading = true;

    this.applicationService
      .updateWebRoleAppAccess(this.webRoleApp.appId, this.webRoleApp.webRole, this.accessField.checked)
      .subscribe({
        next: () => {
          this.modal.close();
          this.modalLoading = false;
          this.webRoleAppUpdate.emit();
          this.popupService.success(`${this.webRoleApp.webRole} app access successfully updated`);
        },
        error: () => {
          this.popupService.error(
            `Unable to update app access for web role '${this.webRoleApp.webRole}' at this time.`
          );
          this.modalLoading = false;
        },
      });
  }
}
