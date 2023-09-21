import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-guardian-children-details-grid',
  templateUrl: './guardian-children-details-grid.component.html',
})
export class GuardianChildrenDetailsGridComponent implements OnInit {
  @Input() guardianId: number;
  dataloader: any;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.dataloader = () => this.getGuardianDataLoader();
  }

  getGuardianDataLoader() {
    return this.childrenService.getChildrenByGuardianId(this.guardianId);
  }

  onRowClick(event: any) {
    this.router.navigate([`/children/${event.id}/details`]);
  }
}
