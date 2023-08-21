import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchCheckInComponent } from './junior-church-check-in/junior-church-check-in.component';
import { NewAttendanceRecordComponent } from './junior-church-check-in/new-attendance-record/new-attendance-record.component';
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
    JuniorChurchCheckInComponent, NewAttendanceRecordComponent
  ],
})
export class JuniorChurchModule { }
