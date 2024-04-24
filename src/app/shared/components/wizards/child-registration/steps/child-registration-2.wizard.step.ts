import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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
  loading = false;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly childrenService: ChildrenService
  ) {
    this.childrenDataloader = (params) =>
      this.childrenService.get(params.set('notChurchGroup', this.wizardData.filteredOutGroups));
  }

  onCancelClick() {
    this.navigationService.navigate(`${this.wizardData.baseRoute}/check-in`);
  }

  onNextClick(child: Child) {
    child.churchGroup = [this.wizardData.registrationGroup];
    this.loading = false;
    this.next.emit(child);
  }
}
