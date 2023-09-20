import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { ApplicationService } from 'src/service/access-manager/application.service';
import { FeatureService } from 'src/service/access-manager/feature.service';

@Component({
  selector: 'app-access-manager-features',
  templateUrl: './access-manager-features.component.html',
})
export class AccessManagerFeaturesComponent implements OnInit {
  dataloader: any;
  mappedApplications: any[];

  constructor(
    private readonly featureService: FeatureService,
    private readonly applicationService: ApplicationService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.featureService.get(params);
  }

  ngOnInit() {
    this.applicationService.get().subscribe((res) => {
      this.mappedApplications = res.body.map((a) => {
        return { name: a.displayName, value: a.id };
      });
    });
  }

  onRowClick(app: Application) {
    this.router.navigate([`/access-manager/features/${app.id}/details`]);
  }
}
