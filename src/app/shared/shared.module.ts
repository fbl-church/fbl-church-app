import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ChildAdditionalInfoCardCardComponent } from './components/cards/children/child-additional-info-card/child-additional-info-card.component';
import { ChildDetailsCardComponent } from './components/cards/children/child-details-card/child-details-card.component';
import { ChildGuardiansGridCardComponent } from './components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { GuardianDetailsCardComponent } from './components/cards/guardians/guardian-details-card/guardian-details-card.component';
import { UserDetailsCardComponent } from './components/cards/users/user-details-card/user-details-card.component';
import { UserRolesCardComponent } from './components/cards/users/user-roles-card/user-roles-card.component';
import { AttendanceRecordFormComponent } from './components/forms/attendance-record-form/attendance-record-form.component';
import { ChildFormComponent } from './components/forms/child-form/child-form.component';
import { GuardianFormComponent } from './components/forms/guardian-form/guardian-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { AttendanceRecordGridComponent } from './components/grids/attendance/attendance-record-grid/attendance-record-grid.component';
import { AttendanceRecordWorkersGridComponent } from './components/grids/attendance/attendance-record-workers-grid/attendance-record-workers-grid.component';
import { ChildGroupDetailsGridComponent } from './components/grids/children/child-group-details-grid/child-group-details-grid.component';
import { ChildGroupGridCardComponent } from './components/grids/children/child-group-grid-card/child-group-grid-card.component';
import { ChildGuardiansDetailsGridComponent } from './components/grids/children/child-guardians-details-grid/child-guardians-details-grid.component';
import { GuardianChildrenDetailsGridComponent } from './components/grids/guardians/guardian-children-details-grid/guardian-children-details-grid.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    ChildGuardiansGridCardComponent,
    GuardianFormComponent,
    UserRolesCardComponent,
    ChildGroupGridCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGroupDetailsGridComponent,
    ChildGuardiansDetailsGridComponent,
    GuardianChildrenDetailsGridComponent,
    AttendanceRecordFormComponent,
    GuardianDetailsCardComponent,
    AttendanceRecordGridComponent,
    AttendanceRecordWorkersGridComponent,
  ],
  exports: [
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    GuardianFormComponent,
    ChildGuardiansGridCardComponent,
    UserRolesCardComponent,
    ChildGroupGridCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGroupDetailsGridComponent,
    ChildGuardiansDetailsGridComponent,
    GuardianChildrenDetailsGridComponent,
    AttendanceRecordFormComponent,
    GuardianDetailsCardComponent,
    AttendanceRecordGridComponent,
    AttendanceRecordWorkersGridComponent,
  ],
})
export class SharedModule {}
