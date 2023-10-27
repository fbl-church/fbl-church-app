import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-awana-children',
  templateUrl: './awana-children.component.html',
})
export class AwanaChildrenComponent {
  dataloader: any;

  constructor(private childrenService: ChildrenService, private readonly router: Router) {
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
    this.router.navigate([`/awana/children/${event.id}/details`]);
  }
}
