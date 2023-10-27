import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private userService: UserService, private readonly router: Router) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  onAddUser() {
    this.router.navigate(['/users/create']);
  }

  onRowClick(user: any) {
    this.router.navigate([`/users/${user.id}/details`]);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }
}
