import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-children',
  templateUrl: './junior-church-children.component.html',
})
export class JuniorChurchChildrenComponent {
  dataloader: any;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private childrenService: ChildrenService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.getJuniorChurchChildrenDataloader(params);
  }

  onRowClick(user: any) {
    this.router.navigate([`/children/${user.id}/details`]);
  }

  getJuniorChurchChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', ['JUNIOR_CHURCH'])
    );
  }
}
