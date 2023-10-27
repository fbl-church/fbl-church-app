import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-delete-application-modal',
  templateUrl: './delete-application-modal.component.html',
})
export class DeleteApplicationModalComponent {
  @ViewChild('deleteApplicationModal') modal: ModalComponent;
  @Input() appId: number;

  modalLoading = false;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onDeleteApplication() {
    this.modalLoading = true;
    this.applicationService.delete(this.appId).subscribe({
      next: () => {
        this.modal.close();
        this.router.navigate(['/access-manager/applications']);
        this.popupService.success('Application successfully deleted!');
      },
      error: () => {
        this.popupService.error('Application could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
