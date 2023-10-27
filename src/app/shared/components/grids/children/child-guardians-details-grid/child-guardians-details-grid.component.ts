import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-child-guardians-details-grid',
  templateUrl: './child-guardians-details-grid.component.html',
})
export class ChildGuardiansDetailsGridComponent implements OnChanges {
  @Input() childId: number;
  @Input() guardians: Guardian[];
  @Input() editVisible = true;
  @Input() enableRowClick = true;

  dataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.guardians && changes.guardians.currentValue) {
      this.dataloader = () => of(new HttpResponse({ body: this.guardians }));
    }
  }

  onEditIconClick() {
    this.router.navigate([`/children/${this.childId}/details/guardians/edit`]);
  }

  onRowClick(event: any) {
    if (this.enableRowClick) {
      this.router.navigate([`/guardians/${event.id}/details`]);
    }
  }
}
