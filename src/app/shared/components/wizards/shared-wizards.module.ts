import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedCardsModule } from '../cards/shared-cards.module';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { SharedGridsModule } from '../grids/shared-grids.module';
import { SharedModalsModule } from '../modals/shared-modals.module';
import { ChildRegistrationWizardComponent } from './child-registration/child-registration-wizard.component';
import { ChildRegistrationWizardStepOneComponent } from './child-registration/steps/child-registration-1.wizard.step';
import { ChildRegistrationWizardStepTwoComponent } from './child-registration/steps/child-registration-2.wizard.step';
import { ChildRegistrationWizardStepThreeComponent } from './child-registration/steps/child-registration-3.wizard.step';
import { ChildRegistrationWizardStepFourComponent } from './child-registration/steps/child-registration-4.wizard.step';

@NgModule({
  imports: [BaseInitModule, SharedGridsModule, SharedCardsModule, SharedModalsModule, SharedFormsModule],
  declarations: [
    ChildRegistrationWizardComponent,
    ChildRegistrationWizardStepOneComponent,
    ChildRegistrationWizardStepTwoComponent,
    ChildRegistrationWizardStepThreeComponent,
    ChildRegistrationWizardStepFourComponent,
  ],
  exports: [
    ChildRegistrationWizardComponent,
    ChildRegistrationWizardStepOneComponent,
    ChildRegistrationWizardStepTwoComponent,
    ChildRegistrationWizardStepThreeComponent,
    ChildRegistrationWizardStepFourComponent,
  ],
})
export class SharedWizardsModule {}
