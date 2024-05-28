import { Component } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian, VBSRegistration } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSService } from 'src/service/vbs/vbs.service';

@Component({
  selector: 'app-vbs-external-registration',
  templateUrl: './vbs-external-registration.component.html',
})
export class VBSExternalRegistrationComponent {
  childrenToRegister: Child[];
  guardiansToCreate: Guardian[];
  childGuardianAssociations: Child[];
  childExists = false;
  loading = false;

  constructor(
    private readonly vbsService: VBSService,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  onStep1Next(exists: boolean, wizard: WizardComponent) {
    this.childExists = exists;
    wizard.next();
  }

  onStep2Next(children: Child[], wizard: WizardComponent) {
    if (this.childExists) {
      this.childGuardianAssociations = children;
      wizard.goToStep(4);
    } else {
      this.childrenToRegister = children;
      wizard.next();
    }
  }

  onStep3Next(guardians: Guardian[], wizard: WizardComponent) {
    this.guardiansToCreate = guardians;
    wizard.next();
  }

  onStep4Next(children: Child[], wizard: WizardComponent) {
    this.childGuardianAssociations = children;
    wizard.next();
  }

  onCancelClick(wizard: WizardComponent) {
    wizard.resetWizard();
  }

  onSaveClick(event?: VBSRegistration) {
    this.loading = true;

    if (this.childExists) {
      // register them as existing children with already set guardians
    } else {
      this.vbsService.registerChildren(event).subscribe({
        next: () => {
          this.navigationService.navigate('/external/vbs/registration/complete');
        },
        error: (res) => {
          this.popupService.error('Unable to register children at this time. Please try again later.');
          this.loading = false;
        },
      });
    }
  }
}
