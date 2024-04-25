import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-one',
  templateUrl: './vbs-child-registration-1.wizard.step.html',
})
export class VBSChildRegistrationWizardStepOneComponent {
  @Output() next = new EventEmitter<boolean>();

  onNextClick(exists: boolean) {
    this.next.emit(exists);
  }
}
