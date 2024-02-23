import { Component, OnInit } from '@angular/core';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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
    private readonly navigationService: NavigationService
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
    this.navigationService.navigate(`/access-manager/features/${app.id}/details`);
  }
}
