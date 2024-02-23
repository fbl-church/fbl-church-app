import { Component } from '@angular/core';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-awana-children',
  templateUrl: './awana-children.component.html',
})
export class AwanaChildrenComponent {
  dataloader: any;

  constructor(private childrenService: ChildrenService, private readonly navigationService: NavigationService) {
    this.dataloader = (params) => this.getAwanaChildrenDataloader(params);
  }

  getAwanaChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', [
        ChurchGroup.TNT_BOYS,
        ChurchGroup.TNT_GIRLS,
        ChurchGroup.CUBBIES,
        ChurchGroup.SPARKS,
        ChurchGroup.CROSS_CHECK,
      ])
    );
  }

  onRowClick(event: Child) {
    this.navigationService.navigate(`/awana/children/${event.id}/details`);
  }
}
