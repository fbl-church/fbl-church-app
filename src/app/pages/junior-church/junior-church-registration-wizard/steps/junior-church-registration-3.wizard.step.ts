import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/child.model';

@Component({
  selector: 'app-junior-church-registration-wizard-step-three',
  templateUrl: './junior-church-registration-3.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepThreeComponent {
  @Input() child: Child;
  @Output() save = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onSaveClick() {
    this.save.emit();
  }
}
