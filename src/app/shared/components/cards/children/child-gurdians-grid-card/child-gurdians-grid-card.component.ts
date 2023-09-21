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
import { ChildGurdianFormComponent } from '../../../forms/child-gurdian-form/child-gurdian-form.component';

@Component({
  selector: 'app-child-gurdians-grid-card',
  templateUrl: './child-gurdians-grid-card.component.html',
})
export class ChildGurdiansGridCardComponent implements OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChild(ChildGurdianFormComponent)
  childGurdianForm: ChildGurdianFormComponent;

  @Input() gurdians: Gurdian[] = [];

  dataloader: any;
  relationships: any[];

  gurdianMapSelection: Map<any, any> = new Map();
  gurdianIdsChecked: number[] = [];
  showGurdianSelectionGrid = true;

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) => this.gurdianService.get(params);
  }

  ngOnInit() {
    this.setSelectedGurdians();
    this.relationships = Object.keys(Relationship).map((v) =>
      this.commonService.translate(v, TranslationKey.RELATIONSHIP)
    );
  }

  getSelectedGurdians(): Gurdian[] {
    if (this.childGurdianForm) {
      return [this.childGurdianForm.getGurdianFormData()];
    } else {
      return this.gridChecklistColumn.getSelected().map((v) => {
        const selection = this.getRelationshipSelections().get(v);
        return {
          id: v,
          relationship: selection
            ? Relationship[selection.toUpperCase()]
            : null,
        };
      });
    }
  }

  onToggleGurdianGrid(show: boolean) {
    this.showGurdianSelectionGrid = show;
  }

  isGurdianFormInvalid() {
    if (this.childGurdianForm) {
      return this.childGurdianForm.invalid;
    } else {
      return false;
    }
  }

  private getRelationshipSelections() {
    return this.gridSelection.getSelections();
  }

  private setSelectedGurdians() {
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
}
