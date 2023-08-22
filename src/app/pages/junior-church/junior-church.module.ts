import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchAttendanceDetailComponent } from './junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { JuniorChurchCheckInComponent } from './junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from './junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchRegistrationWizardComponent } from './junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchRegistrationWizardStepOneComponent } from './junior-church-registration-wizard/steps/junior-church-registration-1.wizard.step';
import { JuniorChurchRegistrationWizardStepTwoComponent } from './junior-church-registration-wizard/steps/junior-church-registration-2.wizard.step';
import { JuniorChurchRegistrationWizardStepThreeComponent } from './junior-church-registration-wizard/steps/junior-church-registration-3.wizard.step';
import { JuniorChurchWorkersComponent } from './junior-church-workers/junior-church-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    JuniorChurchRegistrationWizardComponent,
    JuniorChurchRegistrationWizardStepOneComponent,
    JuniorChurchRegistrationWizardStepTwoComponent,
    JuniorChurchRegistrationWizardStepThreeComponent,
    JuniorChurchWorkersComponent,
    JuniorChurchCheckInComponent,
    JuniorChurchNewAttendanceRecordComponent,
    JuniorChurchAttendanceDetailComponent,
  ],
})
export class JuniorChurchModule {}
