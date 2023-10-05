import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  loading = false;
  disableSave = false;

  constructor(
    private userService: UserService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/users']);
  }

  onSaveClick(user: User) {
    this.loading = true;
    this.disableSave = true;
    this.userService.createUser(user).subscribe({
      next: (res) => {
        this.router.navigate([`/users/${res.id}/details`]);
        this.popupService.success('User Successfully created!');
        this.resetStatus();
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.message.includes('UX_users__email')) {
          this.popupService.error('User with that email already exists');
        } else {
          this.popupService.error('User could not be created!');
        }
        this.resetStatus();
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
