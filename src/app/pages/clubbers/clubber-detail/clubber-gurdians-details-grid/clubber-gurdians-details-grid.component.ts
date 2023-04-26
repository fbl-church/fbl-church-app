import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-clubber-gurdians-details-grid',
  templateUrl: './clubber-gurdians-details-grid.component.html',
  styleUrls: ['./clubber-gurdians-details-grid.component.scss'],
})
export class ClubberGurdiansDetailsGridComponent implements OnInit {
  @Input() clubberId: number;
  dataloader: any;

  editIcon = faPenToSquare;
  constructor(
    private readonly gurdianService: GurdianService,
    private readonly router: Router
  ) {}

  ngOnInit() {
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