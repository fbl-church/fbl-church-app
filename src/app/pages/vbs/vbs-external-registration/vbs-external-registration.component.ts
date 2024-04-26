import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian, VBSRegistration } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-vbs-external-registration',
  templateUrl: './vbs-external-registration.component.html',
})
export class VBSExternalRegistrationComponent {
  childrenToRegister: Child[];
  guardiansToCreate: Guardian[];
  childExists = false;
  loading = false;

  constructor(private readonly route: ActivatedRoute) {}

  onStep1Next(exists: boolean, wizard: WizardComponent) {
    this.childExists = exists;
    wizard.next();
  }

  onStep2Next(children: Child[], wizard: WizardComponent) {
    this.childrenToRegister = children;
    if (this.childExists) {
      wizard.goToStep(3);
    } else {
      wizard.next();
    }
  }

  onStep3Next(guardians: Guardian[], wizard: WizardComponent) {
    this.guardiansToCreate = guardians;
    wizard.next();
  }

  onCancelClick(wizard: WizardComponent) {
    wizard.resetWizard();
  }

  onSaveClick(event?: VBSRegistration) {
    console.log(event);
    this.loading = true;
  }
}
