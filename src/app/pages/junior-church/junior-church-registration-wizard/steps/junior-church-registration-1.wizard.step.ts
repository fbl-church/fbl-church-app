import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-junior-church-registration-wizard-step-one',
  templateUrl: './junior-church-registration-1.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepOneComponent {
  @Output() next = new EventEmitter<Child>();

  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onNextClick(child: Child) {
    child.churchGroup = [ChurchGroup.JUNIOR_CHURCH];
    this.next.emit(child);
  }
}
