import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserService } from 'src/service/users/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  editIcon = faPenToSquare;

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
