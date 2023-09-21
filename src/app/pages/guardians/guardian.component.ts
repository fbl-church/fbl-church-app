import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
})
export class GuardianComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private guardianService: GuardianService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.getGuardianDataLoader(params);
  }

  getGuardianDataLoader(params?: Map<string, string[]>) {
    return this.guardianService.get(params);
  }

  onAddGuardian() {
    this.router.navigate(['/guardians/create']);
  }

  onRowClick(event: any) {
    this.router.navigate([`/guardians/${event.id}/details`]);
  }
}
