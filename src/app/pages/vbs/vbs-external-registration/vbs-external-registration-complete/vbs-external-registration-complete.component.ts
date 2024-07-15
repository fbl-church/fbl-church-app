import { Component, Input, OnInit } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-external-registration-complete',
  templateUrl: './vbs-external-registration-complete.component.html',
})
export class VBSExternalRegistrationCompleteComponent implements OnInit {
  @Input() wizard: WizardComponent;

  isExternal = false;

  constructor(
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.isExternal = this.navigationService.routerUrl().includes('external');
  }

  onNextClick(exists: boolean) {
    this.wizardDataService.clearData();
    this.wizardDataService.updateData({ guardianExists: exists });
    this.wizard.next();
  }

  onReturnClick() {
    this.navigationService.navigate('/vbs/registration', false);
  }
}
