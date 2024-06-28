import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-delete-points-modal',
  templateUrl: './vbs-delete-points-modal.component.html',
})
export class VBSDeletePointsModalComponent {
  @ViewChild('vbsDeletePointsModal') modal: ModalComponent;
  @Output() pointsDeleted = new EventEmitter<void>();

  modalLoading = false;
  deletingPointId: any;

  constructor(private readonly vbsPointsService: VBSPointsService, private readonly popupService: PopupService) {}

  open(pointId: any) {
    this.deletingPointId = pointId;
    this.modal.open();
  }

  onDeletePoints() {
    this.modalLoading = true;

    this.vbsPointsService.delete(this.deletingPointId).subscribe({
      next: () => {
        this.popupService.success('Point Map Successfully Deleted!');
        this.modalLoading = false;
        this.modal.close();
        this.pointsDeleted.emit();
      },

      error: () => {
        this.popupService.error('Unable to delete point map at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }
}
