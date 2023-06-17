import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-gurdian-children-details-grid',
  templateUrl: './gurdian-children-details-grid.component.html',
})
export class GurdianChildrenDetailsGridComponent implements OnInit {
  @Input() gurdianId: number;
  dataloader: any;

  editIcon = faPenToSquare;
  constructor(
    private readonly childrenService: ChildrenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.dataloader = () => this.getGurdianDataLoader();
  }

  getGurdianDataLoader() {
    return this.childrenService.getChildrenByGurdianId(this.gurdianId);
  }

  onRowClick(event: any) {
    this.router.navigate([`/children/${event.id}/details`]);
  }
}
