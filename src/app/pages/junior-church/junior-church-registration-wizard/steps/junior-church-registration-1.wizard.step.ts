import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-junior-church-registration-wizard-step-one',
  templateUrl: './junior-church-registration-1.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepOneComponent {
  @Output() next = new EventEmitter<boolean>();
  loading = false;

  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onNextClick(exists: boolean) {
    this.next.emit(exists);
  }
}
