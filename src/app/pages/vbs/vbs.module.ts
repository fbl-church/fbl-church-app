import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VBSChildRegistrationWizardStepOneComponent } from './vbs-external-registration/steps/vbs-child-registration-1.wizard.step';
import { VBSChildRegistrationWizardStepTwoComponent } from './vbs-external-registration/steps/vbs-child-registration-2.wizard.step';
import { VBSChildRegistrationWizardStepThreeComponent } from './vbs-external-registration/steps/vbs-child-registration-3.wizard.step';
import { VBSChildRegistrationWizardStepFourComponent } from './vbs-external-registration/steps/vbs-child-registration-4.wizard.step';
import { VBSExternalRegistrationComponent } from './vbs-external-registration/vbs-external-registration.component';
import { VBSRegistrationComponent } from './vbs-registration.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    VBSRegistrationComponent,
    VBSExternalRegistrationComponent,
    VBSChildRegistrationWizardStepOneComponent,
    VBSChildRegistrationWizardStepTwoComponent,
    VBSChildRegistrationWizardStepThreeComponent,
    VBSChildRegistrationWizardStepFourComponent,
  ],
})
export class VBSModule {}
