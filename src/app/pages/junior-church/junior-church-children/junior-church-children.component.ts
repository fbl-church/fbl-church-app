import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-children',
  templateUrl: './junior-church-children.component.html',
})
export class JuniorChurchChildrenComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private childrenService: ChildrenService, private readonly router: Router) {
    this.dataloader = (params) => this.getJuniorChurchChildrenDataloader(params);
  }

  getJuniorChurchChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(params.set('churchGroup', ['JUNIOR_CHURCH']));
  }

  onRowClick(event: Child) {
    this.router.navigate([`/junior-church/children/${event.id}/details`]);
  }
}
