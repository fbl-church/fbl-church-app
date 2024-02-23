import { Component } from '@angular/core';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-access-manager-applications',
  templateUrl: './access-manager-applications.component.html',
})
export class AccessManagerApplicationsComponent {
  dataloader: any;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params: any) => this.applicationService.get(params);
  }

  onRowClick(app: Application) {
    this.navigationService.navigate(`/access-manager/applications/${app.id}/details`);
  }

  onCreateApplication() {}
}
