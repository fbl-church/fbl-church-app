import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VBSDashboardComponent } from './dashboard/vbs-dashboard.component';
import { VBSStatCardsComponent } from './dashboard/vbs-stat-cards/vbs-stat-cards.component';
import { VBSChildRegistrationWizardStepOneComponent } from './vbs-external-registration/steps/vbs-child-registration-1.wizard.step';
import { VBSChildRegistrationWizardStepTwoComponent } from './vbs-external-registration/steps/vbs-child-registration-2.wizard.step';
import { VBSChildRegistrationWizardStepThreeComponent } from './vbs-external-registration/steps/vbs-child-registration-3.wizard.step';
import { VBSChildRegistrationWizardStepFourComponent } from './vbs-external-registration/steps/vbs-child-registration-4.wizard.step';
import { VBSChildRegistrationWizardStepFiveComponent } from './vbs-external-registration/steps/vbs-child-registration-5.wizard.step';
import { VBSChildDetailCardComponent } from './vbs-external-registration/vbs-child-detail-card/vbs-child-detail-card.component';
import { VBSExternalRegistrationCompleteComponent } from './vbs-external-registration/vbs-external-registration-complete/vbs-external-registration-complete.component';
import { VBSExternalRegistrationComponent } from './vbs-external-registration/vbs-external-registration.component';
import { VBSGuardianDetailCardComponent } from './vbs-external-registration/vbs-guardian-detail-card/vbs-guardian-detail-card.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    VBSDashboardComponent,
    VBSExternalRegistrationComponent,
    VBSChildRegistrationWizardStepOneComponent,
    VBSChildRegistrationWizardStepTwoComponent,
    VBSChildRegistrationWizardStepThreeComponent,
    VBSChildRegistrationWizardStepFourComponent,
    VBSChildRegistrationWizardStepFiveComponent,
    VBSChildDetailCardComponent,
    VBSGuardianDetailCardComponent,
    VBSExternalRegistrationCompleteComponent,
    VBSStatCardsComponent,
  ],
})
export class VBSModule {}
