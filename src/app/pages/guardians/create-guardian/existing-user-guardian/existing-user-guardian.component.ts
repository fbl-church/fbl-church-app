import { Component, ViewChild } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { UserService } from 'src/service/users/user.service';
import { UserToGuardianModalComponent } from './modals/user-to-guardian-modal/user-to-guardian-modal.component';

@Component({
  selector: 'app-existing-user-guardian',
  templateUrl: './existing-user-guardian.component.html',
})
export class ExistingUserGuardianComponent {
  @ViewChild(UserToGuardianModalComponent)
  userToGuardianModal: UserToGuardianModalComponent;
  userDataloader: any;

  readonly EXISTING_USER_ROLE_FILTER = ['GUARDIAN'];

  constructor(private readonly navigationService: NavigationService, private readonly userService: UserService) {
    this.userDataloader = (params: any) => this.getUserDataLoader(params);
  }

  onCancelClick() {
    this.navigationService.navigate('/guardians/create');
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params.set('notWebRole', this.EXISTING_USER_ROLE_FILTER));
  }

  onUserClick(u: User) {
    this.userToGuardianModal.open(u.id);
  }
}
