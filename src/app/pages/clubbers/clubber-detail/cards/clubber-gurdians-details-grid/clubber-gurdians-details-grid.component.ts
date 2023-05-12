import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-clubber-gurdians-details-grid',
  templateUrl: './clubber-gurdians-details-grid.component.html',
  styleUrls: ['./clubber-gurdians-details-grid.component.scss'],
})
export class ClubberGurdiansDetailsGridComponent {
  @Input() clubberId: number;
  dataloader: any;

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly router: Router
  ) {
    this.dataloader = () => this.getGurdianDataLoader();
  }

  getGurdianDataLoader() {
    return this.gurdianService.getGurdiansByClubberId(this.clubberId);
  }

  onEditIconClick() {}

  onRowClick(event: any) {
    this.router.navigate([`/gurdians/${event.id}/details`]);
  }
}
