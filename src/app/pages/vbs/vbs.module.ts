import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VBSChildrenComponent } from './children/vbs-children.component';
import { VBSGroupDetailsComponent } from './groups/detail/vbs-group-details.component';
import { VBSCreateThemeComponent } from './themes/create-theme/vbs-create-theme.component';
import { VBSThemeDetailsComponent } from './themes/theme-details/vbs-theme-details.component';
import { VBSThemesComponent } from './themes/vbs-themes.component';
import { VBSChildRegistrationWizardStepOneComponent } from './vbs-external-registration/steps/vbs-child-registration-1.wizard.step';
import { VBSChildRegistrationWizardStepTwoComponent } from './vbs-external-registration/steps/vbs-child-registration-2.wizard.step';
import { VBSChildRegistrationWizardStepThreeComponent } from './vbs-external-registration/steps/vbs-child-registration-3.wizard.step';
import { VBSChildRegistrationWizardStepFourComponent } from './vbs-external-registration/steps/vbs-child-registration-4.wizard.step';
import { VBSChildDetailCardComponent } from './vbs-external-registration/vbs-child-detail-card/vbs-child-detail-card.component';
import { VBSExternalRegistrationCompleteComponent } from './vbs-external-registration/vbs-external-registration-complete/vbs-external-registration-complete.component';
import { VBSExternalRegistrationComponent } from './vbs-external-registration/vbs-external-registration.component';
import { VBSGuardianDetailCardComponent } from './vbs-external-registration/vbs-guardian-detail-card/vbs-guardian-detail-card.component';
import { VBSNewGuardianFormComponent } from './vbs-external-registration/vbs-new-guardian-form/vbs-new-guardian-form.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    VBSThemesComponent,
    VBSExternalRegistrationComponent,
    VBSChildRegistrationWizardStepOneComponent,
    VBSChildRegistrationWizardStepTwoComponent,
    VBSChildRegistrationWizardStepThreeComponent,
    VBSChildRegistrationWizardStepFourComponent,
    VBSChildDetailCardComponent,
    VBSGuardianDetailCardComponent,
    VBSExternalRegistrationCompleteComponent,
    VBSGroupDetailsComponent,
    VBSCreateThemeComponent,
    VBSThemeDetailsComponent,
    VBSNewGuardianFormComponent,
    VBSChildrenComponent,
  ],
})
export class VBSModule {}
