import { Component, Input, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { ChurchGroupService } from 'src/service/church-groups/church-group.service';

@Component({
  selector: 'app-child-group-grid-card',
  templateUrl: './child-group-grid-card.component.html',
})
export class ChildGroupGridCardComponent {
  @ViewChild(GridChecklistColumnComponent)
  gridCheclistColumn: GridChecklistColumnComponent;

  @Input() churchGroupsChecked: ChurchGroup[] = [];

  dataloader: any;
  childrenGroupsChecked: number[] = [];

  constructor(private readonly churchGroupService: ChurchGroupService) {
    this.dataloader = (params: any) => this.getChurchGroupDataloader(params);
  }

  getChurchGroupDataloader(params?: Map<string, string[]>) {
    return this.churchGroupService.get(params);
  }

  getSelectedChurchGroups() {
    return this.gridCheclistColumn.getSelected();
  }
}
