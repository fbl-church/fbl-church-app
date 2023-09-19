import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-gurdian',
  templateUrl: './gurdian.component.html',
})
export class GurdianComponent {
  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private gurdianService: GurdianService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }

  onAddGurdian() {
    this.router.navigate(['/gurdians/create']);
  }

  onRowClick(event: any) {
    this.router.navigate([`/gurdians/${event.id}/details`]);
  }
}
