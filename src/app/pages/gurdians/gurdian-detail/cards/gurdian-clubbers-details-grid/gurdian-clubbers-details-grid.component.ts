import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-gurdian-clubbers-details-grid',
  templateUrl: './gurdian-clubbers-details-grid.component.html',
})
export class ClubberGurdiansDetailsGridComponent implements OnInit {
  @Input() gurdianId: number;
  dataloader: any;

  editIcon = faPenToSquare;
  constructor(
    private readonly clubberService: ClubberService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.dataloader = () => this.getGurdianDataLoader();
  }

  getGurdianDataLoader() {
    return this.clubberService.getClubbersByGurdianId(this.gurdianId);
  }

  onRowClick(event: any) {
    this.router.navigate([`/clubbers/${event.id}/details`]);
  }
}
