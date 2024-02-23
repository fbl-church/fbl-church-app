import { Component } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(private userService: UserService, private readonly navigationService: NavigationService) {
    this.dataloader = (params: any) => this.userService.getInactiveUsers(params);
  }

  onRowClick(user: any) {
    this.navigationService.navigate(`/access-manager/deleted/users/${user.id}/details`);
  }
}
