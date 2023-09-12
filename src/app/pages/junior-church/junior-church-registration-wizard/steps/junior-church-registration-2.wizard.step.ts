import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-registration-wizard-step-two',
  templateUrl: './junior-church-registration-2.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepTwoComponent {
  @Input() childExists = false;
  @Output() next = new EventEmitter<Child>();

  childrenDataloader: any;
  readonly EXISTING_CHURCH_GROUP_FILTER = ['JUNIOR_CHURCH'];

  constructor(
    private readonly router: Router,
    private readonly childrenService: ChildrenService
  ) {
    this.childrenDataloader = (params) =>
      this.childrenService.get(
        params.set('notChurchGroup', this.EXISTING_CHURCH_GROUP_FILTER)
      );
  }

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onNextClick(child: Child) {
    child.churchGroup = [ChurchGroup.JUNIOR_CHURCH];
    this.next.emit(child);
  }
}
