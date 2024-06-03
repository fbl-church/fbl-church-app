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
  selectedGuardian: Guardian;
  childGuardianAssociations: Child[];
  guardianExists = false;
  loading = false;

  constructor(
    private readonly vbsService: VBSService,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  onStep3Next(guardians: Guardian[], wizard: WizardComponent) {
    this.guardiansToCreate = guardians;
    wizard.next();
  }

  onStep4Next(children: Child[], wizard: WizardComponent) {
    this.childGuardianAssociations = children;
    wizard.next();
  }

  onSaveClick(event?: VBSRegistration) {
    this.loading = true;

    if (this.guardianExists) {
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
