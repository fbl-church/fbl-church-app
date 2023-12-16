import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-access-manager-deleted-users',
  templateUrl: './access-manager-deleted-users.component.html',
})
export class AccessManagerDeletedUsersComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private userService: UserService, private readonly router: Router) {
    this.dataloader = (params: any) => this.userService.getInactiveUsers(params);
  }

  onRowClick(user: any) {
    this.router.navigate([`/access-manager/deleted-users/${user.id}/details`]);
  }
}
