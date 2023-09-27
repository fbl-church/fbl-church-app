import { Component } from '@angular/core';
import {
  Access,
  App,
  ChurchGroup,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-nursery-children',
  templateUrl: './nursery-children.component.html',
})
export class NurseryChildrenComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private childrenService: ChildrenService) {
    this.dataloader = (params) => this.getNurseryChildrenDataloader(params);
  }

  getNurseryChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', [ChurchGroup.NURSERY])
    );
  }
}
