import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ChildAdditionalInfoCardCardComponent } from './components/cards/children/child-additional-info-card/child-additional-info-card.component';
import { ChildDetailsCardComponent } from './components/cards/children/child-details-card/child-details-card.component';
import { ChildGroupDetailsGridComponent } from './components/cards/children/child-group-details-grid/child-group-details-grid.component';
import { ChildGroupGridCardComponent } from './components/cards/children/child-group-grid-card/child-group-grid-card.component';
import { ChildGurdiansDetailsGridComponent } from './components/cards/children/child-gurdians-details-grid/child-gurdians-details-grid.component';
import { ChildGurdiansGridCardComponent } from './components/cards/children/child-gurdians-grid-card/child-gurdians-grid-card.component';
import { GurdianChildrenDetailsGridComponent } from './components/cards/gurdians/gurdian-children-details-grid/gurdian-children-details-grid.component';
import { UserDetailsCardComponent } from './components/cards/users/user-details-card/user-details-card.component';
import { UserRolesCardComponent } from './components/cards/users/user-roles-card/user-roles-card.component';
import { AttendanceRecordFormComponent } from './components/forms/attendance-record-form/attendance-record-form.component';
import { ChildFormComponent } from './components/forms/child-form/child-form.component';
import { GurdianFormComponent } from './components/forms/gurdian-form/gurdian-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    ChildGurdiansGridCardComponent,
    GurdianFormComponent,
    UserRolesCardComponent,
    ChildGroupGridCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGroupDetailsGridComponent,
    ChildGurdiansDetailsGridComponent,
    GurdianChildrenDetailsGridComponent,
    AttendanceRecordFormComponent,
  ],
  exports: [
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    GurdianFormComponent,
    ChildGurdiansGridCardComponent,
    UserRolesCardComponent,
    ChildGroupGridCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGroupDetailsGridComponent,
    ChildGurdiansDetailsGridComponent,
    GurdianChildrenDetailsGridComponent,
    AttendanceRecordFormComponent,
  ],
})
export class SharedModule {}
