import { Component } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(private userService: UserService, private readonly navigationService: NavigationService) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  onAddUser() {
    this.navigationService.navigate('/users/create');
  }

  onRowClick(user: any) {
    this.navigationService.navigate(`/users/${user.id}/details`);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }
}
