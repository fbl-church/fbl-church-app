import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-child-gurdians-details-grid',
  templateUrl: './child-gurdians-details-grid.component.html',
})
export class ChildGurdiansDetailsGridComponent implements OnChanges {
  @Input() childId: number;
  @Input() gurdians: Gurdian[];
  @Input() editVisible = true;
  @Input() enableRowClick = true;

  dataloader: any;

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gurdians && changes.gurdians.currentValue) {
      this.dataloader = () => of(new HttpResponse({ body: this.gurdians }));
    }
  }

  onEditIconClick() {
    this.router.navigate([`/children/${this.childId}/details/gurdians/edit`]);
  }

  onRowClick(event: any) {
    if (this.enableRowClick) {
      this.router.navigate([`/gurdians/${event.id}/details`]);
    }
  }
}
