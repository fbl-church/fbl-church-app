import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AttendanceRecordDetailsCardComponent } from './components/cards/attendance/attendance-record-details-card/attendance-record-details-card.component';
import { ChildAdditionalInfoCardCardComponent } from './components/cards/children/child-additional-info-card/child-additional-info-card.component';
import { ChildDetailsCardComponent } from './components/cards/children/child-details-card/child-details-card.component';
import { ChildGuardiansGridCardComponent } from './components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { GuardianDetailsCardComponent } from './components/cards/guardians/guardian-details-card/guardian-details-card.component';
import { UserDetailsCardComponent } from './components/cards/users/user-details-card/user-details-card.component';
import { UserRolesCardComponent } from './components/cards/users/user-roles-card/user-roles-card.component';
import { VBSAttendanceDetailsCardComponent } from './components/cards/vbs/vbs-attendance-details-card/vbs-attendance-details-card.component';
import { AttendanceRecordFormComponent } from './components/forms/attendance-record-form/attendance-record-form.component';
import { ChildFormComponent } from './components/forms/child-form/child-form.component';
import { GuardianFormComponent } from './components/forms/guardian-form/guardian-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { AttendanceRecordChildrenGridComponent } from './components/grids/attendance/attendance-record-children-grid/attendance-record-children-grid.component';
import { AttendanceRecordGridComponent } from './components/grids/attendance/attendance-record-grid/attendance-record-grid.component';
import { AttendanceRecordWorkersGridComponent } from './components/grids/attendance/attendance-record-workers-grid/attendance-record-workers-grid.component';
import { ChildAttendanceRecordsGridComponent } from './components/grids/attendance/child-attendance-records-grid/child-attendance-records-grid.component';
import { ChildGroupDetailsGridComponent } from './components/grids/children/child-group-details-grid/child-group-details-grid.component';
import { ChildGroupGridCardComponent } from './components/grids/children/child-group-grid-card/child-group-grid-card.component';
import { ChildGuardiansDetailsGridComponent } from './components/grids/children/child-guardians-details-grid/child-guardians-details-grid.component';
import { GuardianChildrenDetailsGridComponent } from './components/grids/guardians/guardian-children-details-grid/guardian-children-details-grid.component';
import { AttendanceRecordDetailHeaderComponent } from './components/headers/attendance-record-detail-header/attendance-record-detail-header.component';
import { VBSAttendanceDetailHeaderComponent } from './components/headers/vbs-attendance-detail-header/vbs-attendance-detail-header.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AddGuardianModalComponent } from './components/modals/add-guardian-modal/add-guardian-modal.component';
import { AttendanceScheduleDownloadModalComponent } from './components/modals/attendance-schedule-download-modal/attendance-schedule-download-modal.component';
import { CloseAttendanceRecordModalComponent } from './components/modals/close-attendance-record-modal/close-attendance-record-modal.component';
import { DeleteRecordModalComponent } from './components/modals/delete-record-modal/delete-record-modal.component';
import { DeleteUserModalComponent } from './components/modals/delete-user-modal/delete-user-modal.component';
import { DuplicateChildModalComponent } from './components/modals/duplicate-child-modal/duplicate-child-modal.component';
import { DuplicateGuardianModalComponent } from './components/modals/duplicate-guardian-modal/duplicate-guardian-modal.component';
import { GuardianWarningModalComponent } from './components/modals/guardian-warning-modal/guardian-warning-modal.component';
import { ResetPasswordModalComponent } from './components/modals/reset-password-modal/reset-password-modal.component';
import { UpdateChildAttendanceModalComponent } from './components/modals/update-child-attendance-modal/update-child-attendance-modal.component';
import { VBSAttendanceRecordModalComponent } from './components/modals/vbs-attendance-record-modal/vbs-attendance-record-modal.component';
import { VBSCreatePointsModalComponent } from './components/modals/vbs-create-points-modal/vbs-create-points-modal.component';
import { VBSDeletePointsModalComponent } from './components/modals/vbs-delete-points-modal/vbs-delete-points-modal.component';
import { VBSPointsModalComponent } from './components/modals/vbs-points-modal/vbs-points-modal.component';
import { VBSAttendanceDetailEditComponent } from './components/pages/vbs/vbs-attendance-detail-edit/vbs-attendance-detail-edit.component';
import { VBSAttendanceDetailComponent } from './components/pages/vbs/vbs-attendance-detail/vbs-attendance-detail.component';
import { ChildRegistrationWizardComponent } from './components/wizards/child-registration/child-registration-wizard.component';
import { ChildRegistrationWizardStepOneComponent } from './components/wizards/child-registration/steps/child-registration-1.wizard.step';
import { ChildRegistrationWizardStepTwoComponent } from './components/wizards/child-registration/steps/child-registration-2.wizard.step';
import { ChildRegistrationWizardStepThreeComponent } from './components/wizards/child-registration/steps/child-registration-3.wizard.step';
import { ChildRegistrationWizardStepFourComponent } from './components/wizards/child-registration/steps/child-registration-4.wizard.step';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UnauthenticatedLayoutComponent,
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
    AttendanceRecordDetailsCardComponent,
    AttendanceRecordDetailHeaderComponent,
    CloseAttendanceRecordModalComponent,
    DeleteRecordModalComponent,
    AttendanceRecordChildrenGridComponent,
    ChildRegistrationWizardComponent,
    ChildRegistrationWizardStepOneComponent,
    ChildRegistrationWizardStepTwoComponent,
    ChildRegistrationWizardStepThreeComponent,
    ChildRegistrationWizardStepFourComponent,
    GuardianWarningModalComponent,
    ChildAttendanceRecordsGridComponent,
    DuplicateChildModalComponent,
    DuplicateGuardianModalComponent,
    AddGuardianModalComponent,
    DeleteUserModalComponent,
    AttendanceScheduleDownloadModalComponent,
    ResetPasswordModalComponent,
    UpdateChildAttendanceModalComponent,
    VBSAttendanceDetailComponent,
    VBSAttendanceDetailsCardComponent,
    VBSAttendanceDetailEditComponent,
    VBSAttendanceRecordModalComponent,
    VBSAttendanceDetailHeaderComponent,
    VBSCreatePointsModalComponent,
    VBSPointsModalComponent,
    VBSDeletePointsModalComponent,
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
    AttendanceRecordDetailsCardComponent,
    AttendanceRecordDetailHeaderComponent,
    CloseAttendanceRecordModalComponent,
    DeleteRecordModalComponent,
    AttendanceRecordChildrenGridComponent,
    ChildRegistrationWizardComponent,
    ChildRegistrationWizardStepOneComponent,
    ChildRegistrationWizardStepTwoComponent,
    ChildRegistrationWizardStepThreeComponent,
    ChildRegistrationWizardStepFourComponent,
    GuardianWarningModalComponent,
    ChildAttendanceRecordsGridComponent,
    DuplicateChildModalComponent,
    DuplicateGuardianModalComponent,
    AddGuardianModalComponent,
    QRCodeModule,
    DeleteUserModalComponent,
    AttendanceScheduleDownloadModalComponent,
    ResetPasswordModalComponent,
    UpdateChildAttendanceModalComponent,
    VBSAttendanceDetailComponent,
    VBSAttendanceDetailsCardComponent,
    VBSAttendanceDetailEditComponent,
    VBSAttendanceRecordModalComponent,
    VBSAttendanceDetailHeaderComponent,
    VBSCreatePointsModalComponent,
    VBSPointsModalComponent,
    VBSDeletePointsModalComponent,
  ],
})
export class SharedModule {}
