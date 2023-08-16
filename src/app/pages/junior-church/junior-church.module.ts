import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchRegistrationWizardComponent } from './junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchRegistrationWizardStepOneComponent } from './junior-church-registration-wizard/steps/junior-church-registration-1.wizard.step';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    JuniorChurchRegistrationWizardComponent,
    JuniorChurchRegistrationWizardStepOneComponent,
  ],
})
export class JuniorChurchModule {}
