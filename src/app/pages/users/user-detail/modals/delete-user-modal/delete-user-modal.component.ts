import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
})
export class DeleteUserModalComponent {
  @ViewChild('deleteUserModal') modal: ModalComponent;
  @Input() userId: number;

  modalLoading = false;

  constructor(
    private readonly userService: UserService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onDeleteUser() {
    this.modalLoading = true;
    this.userService.delete(this.userId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.popupService.success('User successfully deleted!');
        this.router.navigate(['/users']);
      },
      error: () => {
        this.popupService.error('User could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
