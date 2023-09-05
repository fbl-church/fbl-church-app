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
  selector: 'app-child-gurdians-details-grid',
  templateUrl: './child-gurdians-details-grid.component.html',
})
export class ChildGurdiansDetailsGridComponent {
  @Input() childId: number;
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
    return this.gurdianService.getGurdiansByChildId(this.childId);
  }

  onEditIconClick() {
    this.router.navigate([`/children/${this.childId}/details/gurdians/edit`]);
  }

  onRowClick(event: any) {
    this.router.navigate([`/gurdians/${event.id}/details`]);
  }
}
