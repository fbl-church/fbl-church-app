import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-child-registration-wizard-step-two',
  templateUrl: './child-registration-2.wizard.step.html',
})
export class ChildRegistrationWizardStepTwoComponent {
  @Input() wizardData: WizardData;
  @Input() childExists = false;
  @Output() next = new EventEmitter<Child>();

  childrenDataloader: any;

  constructor(
    private readonly router: Router,
    private readonly childrenService: ChildrenService
  ) {
    this.childrenDataloader = (params) =>
      this.childrenService.get(
        params.set('notChurchGroup', this.wizardData.filteredOutGroups)
      );
  }

  onCancelClick() {
    this.router.navigate([`${this.wizardData.baseRoute}/check-in`]);
  }

  onNextClick(child: Child) {
    child.churchGroup = [this.wizardData.registrationGroup];
    this.next.emit(child);
  }
}
