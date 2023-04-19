import { Component } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  dataloader: any;
  addCirlce = faCirclePlus;

  constructor(private userService: UserService) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }
}
