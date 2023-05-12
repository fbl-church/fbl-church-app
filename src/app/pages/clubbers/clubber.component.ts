import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-clubber',
  templateUrl: './clubber.component.html',
  styleUrls: ['./clubber.component.scss'],
})
export class ClubberComponent {
  dataloader: any;
  addCirlce = faCirclePlus;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private clubberService: ClubberService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.getClubberDataLoader(params);
  }

  getClubberDataLoader(params?: Map<string, string[]>) {
    return this.clubberService.get(params);
  }

  onAddClubber() {
    this.router.navigate(['/clubbers/create']);
  }

  onRowClick(event: any) {
    this.router.navigate([`/clubbers/${event.id}/details`]);
  }
}
