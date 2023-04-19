import { Component } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-clubber',
  templateUrl: './clubber.component.html',
  styleUrls: ['./clubber.component.scss'],
})
export class ClubberComponent {
  dataloader: any;
  addCirlce = faCirclePlus;

  constructor(private clubberService: ClubberService) {
    this.dataloader = (params: any) => this.getClubberDataLoader(params);
  }

  getClubberDataLoader(params?: Map<string, string[]>) {
    return this.clubberService.getClubbers(params);
  }
}
