import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-gurdian',
  templateUrl: './gurdian.component.html',
  styleUrls: ['./gurdian.component.scss'],
})
export class GurdianComponent {
  dataloader: any;
  addCirlce = faCirclePlus;

  constructor(
    private gurdianService: GurdianService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }

  onAddGurdian() {
    this.router.navigate(['/gurdians/create']);
  }

  onRowClick(event: any) {
    this.router.navigate([`/gurdians/${event.id}/details`]);
  }
}