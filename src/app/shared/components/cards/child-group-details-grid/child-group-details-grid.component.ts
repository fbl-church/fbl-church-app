import { HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Child } from 'projects/insite-kit/src/model/child.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-child-group-details-grid',
  templateUrl: './child-group-details-grid.component.html',
  styleUrls: ['./child-group-details-grid.component.scss'],
})
export class ChildGroupDetailsGridComponent {
  @Input() child: Child;
  dataloader: any;

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly commonService: CommonService,
    private readonly router: Router
  ) {
    this.dataloader = () => this.getGurdianDataLoader();
  }

  getGurdianDataLoader() {
    const mappedGroups = [];
    this.child.churchGroup.forEach((cg) =>
      mappedGroups.push({
        id: cg,
        name: this.commonService.getFormattedChurchGroup(cg),
      })
    );
    return of(new HttpResponse({ body: mappedGroups }));
  }

  onEditIconClick() {
    this.router.navigate([`/children/${this.child.id}/details/groups/edit`]);
  }
}
