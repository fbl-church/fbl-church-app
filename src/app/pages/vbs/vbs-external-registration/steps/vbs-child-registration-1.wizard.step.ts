import { Component, Input } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-one',
  templateUrl: './vbs-child-registration-1.wizard.step.html',
})
export class VBSChildRegistrationWizardStepOneComponent {
  @Input() wizard: WizardComponent;

  constructor(private readonly wizardDataService: VBSExternalRegistrationWizardDataService) {}

  onNextClick(exists: boolean) {
    this.wizardDataService.clearData();
    this.wizardDataService.updateData({ childExists: exists });
    this.wizard.next();
  }
}
