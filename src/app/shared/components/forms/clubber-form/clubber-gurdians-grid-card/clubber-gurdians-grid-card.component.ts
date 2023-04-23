import { Component, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-clubber-gurdians-grid-card',
  templateUrl: './clubber-gurdians-grid-card.component.html',
})
export class ClubberGurdiansGridCardComponent {
  @ViewChild(GridChecklistColumnComponent)
  grid: GridChecklistColumnComponent;

  dataloader: any;

  constructor(private readonly gurdianService: GurdianService) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }

  getSelectedGurdians() {
    return this.grid.getSelected();
  }
}
