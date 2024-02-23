import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-delete-feature-modal',
  templateUrl: './delete-feature-modal.component.html',
})
export class DeleteFeatureModalComponent {
  @ViewChild('deleteFeatureModal') modal: ModalComponent;
  @Input() featureId: number;

  modalLoading = false;

  constructor(
    private readonly featureService: FeatureService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService
  ) {}

  onDeleteFeature() {
    this.modalLoading = true;
    this.featureService.delete(this.featureId).subscribe({
      next: () => {
        this.modal.close();
        this.navigationService.navigate('/access-manager/features');
        this.popupService.success('Feature successfully deleted!');
      },
      error: () => {
        this.popupService.error('Feature could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
