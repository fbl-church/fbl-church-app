import { Component, Input } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-external-registration-complete',
  templateUrl: './vbs-external-registration-complete.component.html',
})
export class VBSExternalRegistrationCompleteComponent {
  @Input() wizard: WizardComponent;

  constructor(private readonly wizardDataService: VBSExternalRegistrationWizardDataService) {}

  onNextClick(exists: boolean) {
    this.wizardDataService.clearData();
    this.wizardDataService.updateData({ guardianExists: exists });
    this.wizard.next();
  }
}
