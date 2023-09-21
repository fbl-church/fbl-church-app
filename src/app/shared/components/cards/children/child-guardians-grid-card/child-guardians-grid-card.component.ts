import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import {
  Relationship,
  TranslationKey,
} from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { ChildGuardianFormComponent } from '../../../forms/child-guardian-form/child-guardian-form.component';

@Component({
  selector: 'app-child-guardians-grid-card',
  templateUrl: './child-guardians-grid-card.component.html',
})
export class ChildGuardiansGridCardComponent implements OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChild(ChildGuardianFormComponent)
  childGuardianForm: ChildGuardianFormComponent;

  @Input() guardians: Guardian[] = [];

  dataloader: any;
  relationships: any[];

  guardianMapSelection: Map<any, any> = new Map();
  guardianIdsChecked: number[] = [];
  showGuardianSelectionGrid = true;

  constructor(
    private readonly guardianService: GuardianService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) => this.guardianService.get(params);
  }

  ngOnInit() {
    this.setSelectedGuardians();
    this.relationships = Object.keys(Relationship).map((v) =>
      this.commonService.translate(v, TranslationKey.RELATIONSHIP)
    );
  }

  getSelectedGuardians(): Guardian[] {
    if (this.childGuardianForm) {
      return [this.childGuardianForm.getGuardianFormData()];
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

  onToggleGuardianGrid(show: boolean) {
    this.showGuardianSelectionGrid = show;
  }

  isGuardianFormInvalid() {
    if (this.childGuardianForm) {
      return this.childGuardianForm.invalid;
    } else {
      return false;
    }
  }

  private getRelationshipSelections() {
    return this.gridSelection.getSelections();
  }

  private setSelectedGuardians() {
    if (this.guardians.length <= 0) {
      return;
    }

    this.guardianIdsChecked = this.guardians.map((g) => g.id);
    this.guardians.forEach((g) =>
      this.guardianMapSelection.set(
        g.id,
        this.commonService.translate(
          g.relationship,
          TranslationKey.RELATIONSHIP
        )
      )
    );
  }
}
