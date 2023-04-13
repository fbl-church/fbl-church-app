import { Component, OnInit } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      console.log(res);
    });
  }
}
