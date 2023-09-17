import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchAttendanceDetailComponent } from './junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { ChildCheckInModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/child-check-in-modal/child-check-in-modal.component';
import { CloseAttendanceRecordModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/close-attendance-record-modal/close-attendance-record-modal.component';
import { DeleteRecordModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/delete-record-modal/delete-record-modal.component';
import { EditJuniorChurchRecordComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-attendance-record/edit-junior-church-attendance-record.component';
import { EditJuniorChurchChildrenCheckInComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-children-check-in/edit-junior-church-children-check-in.component';
import { JuniorChurchCheckInComponent } from './junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from './junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchChildrenComponent } from './junior-church-children/junior-church-children.component';
import { JuniorChurchRegistrationWizardComponent } from './junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchRegistrationWizardStepOneComponent } from './junior-church-registration-wizard/steps/junior-church-registration-1.wizard.step';
import { JuniorChurchRegistrationWizardStepTwoComponent } from './junior-church-registration-wizard/steps/junior-church-registration-2.wizard.step';
import { JuniorChurchRegistrationWizardStepThreeComponent } from './junior-church-registration-wizard/steps/junior-church-registration-3.wizard.step';
import { JuniorChurchRegistrationWizardStepFourComponent } from './junior-church-registration-wizard/steps/junior-church-registration-4.wizard.step';
import { JuniorChurchWorkersComponent } from './junior-church-workers/junior-church-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    JuniorChurchRegistrationWizardComponent,
    JuniorChurchRegistrationWizardStepOneComponent,
    JuniorChurchRegistrationWizardStepTwoComponent,
    JuniorChurchRegistrationWizardStepThreeComponent,
    JuniorChurchRegistrationWizardStepFourComponent,
    JuniorChurchWorkersComponent,
    JuniorChurchCheckInComponent,
    JuniorChurchNewAttendanceRecordComponent,
    JuniorChurchAttendanceDetailComponent,
    EditJuniorChurchRecordComponent,
    DeleteRecordModalComponent,
    JuniorChurchChildrenComponent,
    CloseAttendanceRecordModalComponent,
    EditJuniorChurchChildrenCheckInComponent,
    ChildCheckInModalComponent,
  ],
})
export class JuniorChurchModule {}
