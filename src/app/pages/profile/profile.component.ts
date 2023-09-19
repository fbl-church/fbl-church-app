import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserService } from 'src/service/users/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  WebRole = WebRole;

  constructor(
    private readonly userService: UserService,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .subscribe((res) => (this.currentUser = res.body));
  }

  onBackClick() {
    this.location.back();
  }

  onEditClick() {
    this.router.navigate(['/profile/edit']);
  }

  onResetPassword() {
    this.router.navigate(['/profile/reset-password']);
  }
}
