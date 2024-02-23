import { Component } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params: any) => this.getchildDataLoader(params);
  }

  getchildDataLoader(params?: Map<string, string[]>) {
    return this.childrenService.get(params);
  }

  onAddChild() {
    this.navigationService.navigate('/children/create');
  }

  onRowClick(event: any) {
    this.navigationService.navigate(`/children/${event.id}/details`);
  }
}
