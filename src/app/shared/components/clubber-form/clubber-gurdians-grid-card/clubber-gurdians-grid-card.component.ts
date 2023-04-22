import { Component } from '@angular/core';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-clubber-gurdians-grid-card',
  templateUrl: './clubber-gurdians-grid-card.component.html',
})
export class ClubberGurdiansGridCardComponent {
  dataloader: any;

  constructor(private readonly gurdianService: GurdianService) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }
}
