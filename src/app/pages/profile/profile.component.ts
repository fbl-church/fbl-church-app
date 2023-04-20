import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserService } from 'src/service/users/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService,
    private readonly location: Location
  ) {}

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .subscribe((res) => (this.currentUser = res.body));
  }

  onBackClick() {
    this.location.back();
  }
}
