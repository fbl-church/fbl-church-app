import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-access-manager-features',
  templateUrl: './access-manager-features.component.html',
})
export class AccessManagerFeaturesComponent {
  dataloader: any;

  constructor(
    private readonly featureService: FeatureService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.featureService.get(params);
  }

  onRowClick(app: Application) {
    this.router.navigate([`/access-manager/features/${app.id}/details`]);
  }
}
