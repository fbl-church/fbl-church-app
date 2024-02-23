import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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
    private readonly navigationService: NavigationService
  ) {}

  onDeleteApplication() {
    this.modalLoading = true;
    this.applicationService.delete(this.appId).subscribe({
      next: () => {
        this.modal.close();
        this.navigationService.navigate('/access-manager/applications');
        this.popupService.success('Application successfully deleted!');
      },
      error: () => {
        this.popupService.error('Application could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
