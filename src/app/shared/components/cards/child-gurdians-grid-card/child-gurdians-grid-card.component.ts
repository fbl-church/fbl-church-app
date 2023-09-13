import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import {
  Relationship,
  TranslationKey,
} from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-child-gurdians-grid-card',
  templateUrl: './child-gurdians-grid-card.component.html',
})
export class ChildGurdiansGridCardComponent implements OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridCheclistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;

  @Input() gurdians: Gurdian[] = [];

  dataloader: any;
  relationships: any[];

  gurdianMapSelection: Map<any, any> = new Map();
  gurdianIdsChecked: number[] = [];

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) => this.getGurdianDataLoader(params);
  }

  ngOnInit() {
    this.setSelectedGurdians();
    this.relationships = Object.keys(Relationship).map((v) =>
      this.commonService.translate(v, TranslationKey.RELATIONSHIP)
    );
  }

  getGurdianDataLoader(params?: Map<string, string[]>) {
    return this.gurdianService.get(params);
  }

  getSelectedGurdians(): Gurdian[] {
    return this.gridCheclistColumn.getSelected().map((v) => {
      return {
        id: v,
        relationship: this.getRelationshipSelections().get(v)
          ? Relationship[this.getRelationshipSelections().get(v).toUpperCase()]
          : null,
      };
    });
  }

  getRelationshipSelections() {
    return this.gridSelection.getSelections();
  }

  setSelectedGurdians() {
    if (this.gurdians.length <= 0) {
      return;
    }

    this.gurdianIdsChecked = this.gurdians.map((g) => g.id);
    this.gurdians.forEach((g) =>
      this.gurdianMapSelection.set(
        g.id,
        this.commonService.translate(
          g.relationship,
          TranslationKey.RELATIONSHIP
        )
      )
    );
  }

  onAddGurdianClick() {}
}
