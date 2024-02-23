import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-delete-child-modal',
  templateUrl: './delete-child-modal.component.html',
})
export class DeleteChildModalComponent {
  @ViewChild('deleteChildModal') modal: ModalComponent;
  @Input() childId: number;

  modalLoading = false;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService
  ) {}

  onDeleteChild() {
    this.modalLoading = true;
    this.childrenService.delete(this.childId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.popupService.success('Child successfully deleted!');
        this.navigationService.navigate('/children');
      },
      error: () => {
        this.popupService.error('Child could not be deleted at this time!');
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }
}
