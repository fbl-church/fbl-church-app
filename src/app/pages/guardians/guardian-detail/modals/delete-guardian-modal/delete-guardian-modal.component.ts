import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-delete-guardian-modal',
  templateUrl: './delete-guardian-modal.component.html',
})
export class DeleteGuardianModalComponent {
  @ViewChild('deleteGuardianModal') modal: ModalComponent;
  @Input() guardianId: number;

  modalLoading = false;

  constructor(
    private readonly guardianService: GuardianService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onDeleteGuardian() {
    this.modalLoading = true;
    this.guardianService.delete(this.guardianId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.popupService.success('Guardian successfully deleted!');
        this.router.navigate(['/guardians']);
      },
      error: () => {
        this.modal.close();
        this.popupService.error('Guardian could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
