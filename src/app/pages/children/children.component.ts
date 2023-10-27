import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
})
export class ChildrenComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private readonly childrenService: ChildrenService, private readonly router: Router) {
    this.dataloader = (params: any) => this.getchildDataLoader(params);
  }

  getchildDataLoader(params?: Map<string, string[]>) {
    return this.childrenService.get(params);
  }

  onAddChild() {
    this.router.navigate(['/children/create']);
  }

  onRowClick(event: any) {
    this.router.navigate([`/children/${event.id}/details`]);
  }
}
