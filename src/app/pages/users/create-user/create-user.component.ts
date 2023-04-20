import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  loading = true;
  disableSave = false;

  constructor(
    private userService: UserService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = false;
  }

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
      },
      error: () => {
        this.popupService.error('User could not be created!');
        this.loading = false;
        this.disableSave = true;
      },
    });
  }
}
