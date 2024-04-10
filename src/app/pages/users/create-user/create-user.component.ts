import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  loading = false;

  constructor(
    private readonly userService: UserService,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.navigationService.back('/users');
  }

  onSaveClick(user: User) {
    this.loading = true;

    this.userService.createUser(user).subscribe({
      next: (res) => {
        this.navigationService.navigate(`/users/${res.id}/details`, false);
        this.popupService.success('User Successfully created!');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.message.includes('UX_users__email')) {
          this.popupService.error('User with that email already exists');
        } else {
          this.popupService.error('User could not be created!');
        }
        this.loading = false;
      },
    });
  }
}
