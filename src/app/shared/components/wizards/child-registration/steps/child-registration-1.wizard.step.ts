import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';

@Component({
  selector: 'app-child-registration-wizard-step-one',
  templateUrl: './child-registration-1.wizard.step.html',
})
export class ChildRegistrationWizardStepOneComponent {
  @Input() wizardData: WizardData;
  @Output() next = new EventEmitter<boolean>();

  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate([`${this.wizardData.baseRoute}/check-in`]);
  }

  onNextClick(exists: boolean) {
    this.next.emit(exists);
  }
}
