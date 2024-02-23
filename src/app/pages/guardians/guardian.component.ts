import { Component } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(private guardianService: GuardianService, private readonly navigationService: NavigationService) {
    this.dataloader = (params: any) => this.getGuardianDataLoader(params);
  }

  getGuardianDataLoader(params?: Map<string, string[]>) {
    return this.guardianService.get(params);
  }

  onAddGuardian() {
    this.navigationService.navigate('/guardians/create');
  }

  onRowClick(event: any) {
    this.navigationService.navigate(`/guardians/${event.id}/details`);
  }
}
