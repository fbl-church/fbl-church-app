import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Relationship, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { AddGuardianModalComponent } from '../../../modals/add-guardian-modal/add-guardian-modal.component';

@Component({
  selector: 'app-child-guardians-grid-card',
  templateUrl: './child-guardians-grid-card.component.html',
})
export class ChildGuardiansGridCardComponent implements OnInit {
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChild(AddGuardianModalComponent)
  addGuardianModal: AddGuardianModalComponent;

  @Input() guardians: Guardian[] = [];

  dataloader: any;
  relationships: any[];

  guardianSelection: any[] = [];
  guardianIdsChecked: number[] = [];

  modalLoading = false;

  constructor(
    private readonly guardianService: GuardianService,
    private readonly commonService: CommonService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {
    this.dataloader = (params: any) => this.guardianService.get(params);
  }

  ngOnInit() {
    this.setSelectedGuardians();
    this.relationships = Object.keys(Relationship).map((v) => {
      return {
        name: this.commonService.translate(v, TranslationKey.RELATIONSHIP),
        value: v,
      };
    });
  }

  getSelectedGuardians(): Guardian[] {
    const selectedIds = this.gridChecklistColumn.getSelected();
    return this.gridSelection
      .getSelections()
      .filter((g) => selectedIds.includes(g.id))
      .map((g) => {
        return { id: g.id, relationship: g.value };
      });
  }

  onAddGuardian(g: Guardian) {
    this.modalLoading = true;

    this.guardianService.create(g).subscribe({
      next: (res) => {
        this.addGuardianModal.close();
        this.gridChecklistColumn.addId(res.id);
        this.gridSelection.addSelection({
          id: res.id,
          value: g.relationship,
        });
        this.grid.refresh();
        this.popupService.success('Guardian Successfully Created and Selected!');
      },
      error: () => {
        this.modalLoading = false;
        this.popupService.error('Unable to create guardian at this time. Try again later!');
      },
    });
  }

  private setSelectedGuardians() {
    if (this.guardians.length <= 0) {
      return;
    }

    this.guardianIdsChecked = this.guardians.map((g) => g.id);
    this.guardianSelection = this.guardians.map((g) => {
      return { id: g.id, value: g.relationship };
    });
  }
}
