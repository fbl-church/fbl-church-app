import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-delete-clubber-modal',
  templateUrl: './delete-clubber-modal.component.html',
})
export class DeleteClubberModalComponent {
  @ViewChild('deleteClubberModal') modal: ModalComponent;
  @Input() clubberId: number;

  modalLoading = false;

  constructor(
    private readonly clubberService: ClubberService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onDeleteClubber() {
    this.modalLoading = true;
    this.clubberService.delete(this.clubberId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.popupService.success('Clubber successfully deleted!');
        this.router.navigate(['/clubbers']);
      },
      error: () => {
        this.popupService.error('Clubber could not be deleted at this time!');
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }
}
