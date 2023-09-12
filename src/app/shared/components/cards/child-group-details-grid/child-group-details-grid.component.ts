import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-child-group-details-grid',
  templateUrl: './child-group-details-grid.component.html',
})
export class ChildGroupDetailsGridComponent implements OnChanges {
  @Input() child: Child;
  @Input() editIconVisible = true;
  dataloader: any;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly commonService: CommonService,
    private readonly router: Router
  ) {
    this.dataloader = () => this.getChildChurchGroups();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.child && changes.child.currentValue) {
      this.dataloader = () => this.getChildChurchGroups();
    }
  }

  getChildChurchGroups() {
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
