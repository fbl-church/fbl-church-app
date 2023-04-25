import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-delete-gurdian-modal',
  templateUrl: './delete-gurdian-modal.component.html',
})
export class DeleteGurdianModalComponent {
  @ViewChild('deleteGurdianModal') modal: ModalComponent;
  @Input() gurdianId: number;

  modalLoading = false;

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onDeleteGurdian() {
    this.modalLoading = true;
    this.gurdianService.delete(this.gurdianId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.popupService.success('Gurdian successfully deleted!');
        this.router.navigate(['/gurdians']);
      },
      error: () => {
        this.modal.close();
        this.popupService.error('Gurdian could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
