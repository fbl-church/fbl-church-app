import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModalsModule } from '../modals/shared-modals.module';
import { AttendanceRecordDetailsCardComponent } from './attendance/attendance-record-details-card/attendance-record-details-card.component';
import { ChildAdditionalInfoCardCardComponent } from './children/child-additional-info-card/child-additional-info-card.component';
import { ChildDetailsCardComponent } from './children/child-details-card/child-details-card.component';
import { ChildGuardiansGridCardComponent } from './children/child-guardians-grid-card/child-guardians-grid-card.component';
import { GuardianDetailsCardComponent } from './guardians/guardian-details-card/guardian-details-card.component';
import { UserDetailsCardComponent } from './users/user-details-card/user-details-card.component';
import { UserRolesCardComponent } from './users/user-roles-card/user-roles-card.component';
import { VBSAttendanceDetailsCardComponent } from './vbs/vbs-attendance-details-card/vbs-attendance-details-card.component';
import { VBSThemeDetailsCardComponent } from './vbs/vbs-theme-details-card/vbs-theme-details-card.component';

@NgModule({
  imports: [BaseInitModule, SharedModalsModule],
  declarations: [
    AttendanceRecordDetailsCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGuardiansGridCardComponent,
    GuardianDetailsCardComponent,
    UserDetailsCardComponent,
    UserRolesCardComponent,
    VBSAttendanceDetailsCardComponent,
    VBSThemeDetailsCardComponent,
  ],
  exports: [
    AttendanceRecordDetailsCardComponent,
    ChildAdditionalInfoCardCardComponent,
    ChildDetailsCardComponent,
    ChildGuardiansGridCardComponent,
    GuardianDetailsCardComponent,
    UserDetailsCardComponent,
    UserRolesCardComponent,
    VBSAttendanceDetailsCardComponent,
    VBSThemeDetailsCardComponent,
  ],
})
export class SharedCardsModule {}
