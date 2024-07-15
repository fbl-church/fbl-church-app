import { Component } from '@angular/core';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-vbs-children',
  templateUrl: './vbs-children.component.html',
})
export class VBSChildrenComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private childrenService: ChildrenService, private readonly navigationService: NavigationService) {
    this.dataloader = (params) => this.getVBSChildrenDataloader(params);
  }

  getVBSChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', [
        ChurchGroup.VBS_PRE_PRIMARY,
        ChurchGroup.VBS_PRIMARY,
        ChurchGroup.VBS_MIDDLER,
        ChurchGroup.VBS_JUNIOR,
      ])
    );
  }

  onRowClick(event: Child) {}
}
