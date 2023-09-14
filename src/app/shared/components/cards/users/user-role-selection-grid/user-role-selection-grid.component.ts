import { Component, Input, ViewChild } from '@angular/core';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { RoleService } from 'src/service/roles/roles.service';

@Component({
  selector: 'app-user-role-selection-grid',
  templateUrl: './user-role-selection-grid.component.html',
})
export class UserRoleSelectionGridComponent {
  @ViewChild(GridChecklistColumnComponent)
  gridCheclistColumn: GridChecklistColumnComponent;
  @Input() selectedRoles: WebRole[] = [];
  @Input() enableEdit = true;

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;

  roleDataloader: any;

  constructor(private readonly roleService: RoleService) {
    this.roleDataloader = (params) => this.roleService.get(params);
  }

  getSelectedRoles() {
    return this.gridCheclistColumn.getSelected();
  }
}
