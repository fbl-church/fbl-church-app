import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AttendanceScheduleDownloadModalComponent } from './attendance/attendance-schedule-download-modal/attendance-schedule-download-modal.component';
import { CloseAttendanceRecordModalComponent } from './attendance/close-attendance-record-modal/close-attendance-record-modal.component';
import { DeleteRecordModalComponent } from './attendance/delete-record-modal/delete-record-modal.component';
import { DuplicateChildModalComponent } from './children/duplicate-child-modal/duplicate-child-modal.component';
import { UpdateChildAttendanceModalComponent } from './children/update-child-attendance-modal/update-child-attendance-modal.component';
import { AddGuardianModalComponent } from './guardian/add-guardian-modal/add-guardian-modal.component';
import { DuplicateGuardianModalComponent } from './guardian/duplicate-guardian-modal/duplicate-guardian-modal.component';
import { GuardianWarningModalComponent } from './guardian/guardian-warning-modal/guardian-warning-modal.component';
import { DeleteUserModalComponent } from './user/delete-user-modal/delete-user-modal.component';
import { ResetPasswordModalComponent } from './user/reset-password-modal/reset-password-modal.component';
import { VBSAttendanceCheckInModalComponent } from './vbs/vbs-attendance-check-in-modal/vbs-attendance-check-in-modal.component';
import { VBSAttendanceRecordModalComponent } from './vbs/vbs-attendance-record-modal/vbs-attendance-record-modal.component';
import { VBSChildAttendanceModalComponent } from './vbs/vbs-child-attendance-modal/vbs-child-attendance-modal.component';
import { VBSCloseThemeModalComponent } from './vbs/vbs-close-theme-modal/vbs-close-theme-modal.component';
import { VBSDeletePointsModalComponent } from './vbs/vbs-delete-points-modal/vbs-delete-points-modal.component';
import { VBSGroupsModalComponent } from './vbs/vbs-groups-modal/vbs-groups-modal.component';
import { VBSPointsModalComponent } from './vbs/vbs-points-modal/vbs-points-modal.component';
import { VBSThemeDetailsModalComponent } from './vbs/vbs-theme-details-modal/vbs-theme-details-modal.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    CloseAttendanceRecordModalComponent,
    DeleteRecordModalComponent,
    GuardianWarningModalComponent,
    DuplicateChildModalComponent,
    DuplicateGuardianModalComponent,
    AddGuardianModalComponent,
    DeleteUserModalComponent,
    AttendanceScheduleDownloadModalComponent,
    ResetPasswordModalComponent,
    UpdateChildAttendanceModalComponent,
    VBSAttendanceRecordModalComponent,
    VBSPointsModalComponent,
    VBSDeletePointsModalComponent,
    VBSAttendanceCheckInModalComponent,
    VBSGroupsModalComponent,
    VBSThemeDetailsModalComponent,
    VBSCloseThemeModalComponent,
    VBSChildAttendanceModalComponent,
  ],
  exports: [
    CloseAttendanceRecordModalComponent,
    DeleteRecordModalComponent,
    GuardianWarningModalComponent,
    DuplicateChildModalComponent,
    DuplicateGuardianModalComponent,
    AddGuardianModalComponent,
    DeleteUserModalComponent,
    AttendanceScheduleDownloadModalComponent,
    ResetPasswordModalComponent,
    UpdateChildAttendanceModalComponent,
    VBSAttendanceRecordModalComponent,
    VBSPointsModalComponent,
    VBSDeletePointsModalComponent,
    VBSAttendanceCheckInModalComponent,
    VBSGroupsModalComponent,
    VBSThemeDetailsModalComponent,
    VBSCloseThemeModalComponent,
    VBSChildAttendanceModalComponent,
  ],
})
export class SharedModalsModule {}
