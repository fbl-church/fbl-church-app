import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-guardian-children-details-grid',
  templateUrl: './guardian-children-details-grid.component.html',
})
export class GuardianChildrenDetailsGridComponent {
  @Input() guardianId: number;
  @Output() rowClick = new EventEmitter<Child>();

  dataloader: any;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly router: Router
  ) {
    this.dataloader = () =>
      this.childrenService.getChildrenByGuardianId(this.guardianId);
  }

  onRowClick(event: any) {
    this.rowClick.emit(event);
  }
}
