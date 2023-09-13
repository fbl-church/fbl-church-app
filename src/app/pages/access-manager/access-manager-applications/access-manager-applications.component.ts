import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-access-manager-applications',
  templateUrl: './access-manager-applications.component.html',
})
export class AccessManagerApplicationsComponent {
  dataloader: any;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.applicationService.get(params);
  }

  onRowClick(app: Application) {
    console.log(app);
    this.router.navigate([`/access-manager/applications/${app.id}/details`]);
  }
}
