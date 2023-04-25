import { Component, OnInit, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import { Relationship } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-clubber-gurdians-grid-card',
  templateUrl: './clubber-gurdians-grid-card.component.html',
})
export class ClubberGurdiansGridCardComponent implements OnInit {
  @ViewChild(GridChecklistColumnComponent)
  grid: GridChecklistColumnComponent;

  @ViewChild(GridSelectionColumnComponent)
  selection: GridSelectionColumnComponent;

  dataloader: any;
  relationships: any[];

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }
  ngOnInit() {
    this.relationships = Object.keys(Relationship).map((v) =>
      this.commonService.getFormattedRelationship(v)
    );
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }

  getSelectedGurdians() {
    return this.grid.getSelected().map((v) => {
      return {
        id: v,
        relationship: this.getRelationshipSelections().get(v)
          ? Relationship[this.getRelationshipSelections().get(v).toUpperCase()]
          : null,
      };
    });
  }

  getRelationshipSelections() {
    return this.selection.getSelections();
  }
}
