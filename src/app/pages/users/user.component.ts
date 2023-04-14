import { Component } from '@angular/core';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  dataloader: any;

  constructor(private userService: UserService) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }
}
