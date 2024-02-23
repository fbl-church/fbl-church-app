import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';

@Component({
  selector: 'app-child-registration-wizard-step-one',
  templateUrl: './child-registration-1.wizard.step.html',
})
export class ChildRegistrationWizardStepOneComponent {
  @Input() wizardData: WizardData;
  @Output() next = new EventEmitter<boolean>();

  constructor(private readonly navigationService: NavigationService) {}

  onCancelClick() {
    this.navigationService.navigate(`${this.wizardData.baseRoute}/check-in`);
  }

  onNextClick(exists: boolean) {
    this.next.emit(exists);
  }
}
