import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
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

  constructor(private childrenService: ChildrenService, private readonly router: Router) {
    this.dataloader = (params) => this.getNurseryChildrenDataloader(params);
  }

  getNurseryChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(params.set('churchGroup', [ChurchGroup.NURSERY]));
  }

  onRowClick(event: Child) {
    this.router.navigate([`/nursery/children/${event.id}/details`]);
  }
}
