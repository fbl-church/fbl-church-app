import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';
import { UserToGurdianModalComponent } from './modals/user-to-gurdian-modal/user-to-gurdian-modal.component';

@Component({
  selector: 'app-existing-user-gurdian',
  templateUrl: './existing-user-gurdian.component.html',
})
export class ExistingUserGurdianComponent {
  @ViewChild(UserToGurdianModalComponent)
  userToGurdianModal: UserToGurdianModalComponent;
  userDataloader: any;

  readonly EXISTING_USER_ROLE_FILTER = ['GURDIAN', 'ADMIN'];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly popupService: PopupService
  ) {
    this.userDataloader = (params: any) => this.getUserDataLoader(params);
  }

  onCancelClick() {
    this.router.navigate(['/gurdians/create']);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(
      params.set('notWebRole', this.EXISTING_USER_ROLE_FILTER)
    );
  }

  onUserClick(u: User) {
    this.userToGurdianModal.open(u.id);
  }
}
