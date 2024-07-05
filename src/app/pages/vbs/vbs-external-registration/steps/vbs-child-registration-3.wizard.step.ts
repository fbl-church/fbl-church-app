import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DropdownItem } from 'projects/insite-kit/src/component/select/dropdown-item.model';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Relationship, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-three',
  templateUrl: './vbs-child-registration-3.wizard.step.html',
})
export class VBSChildRegistrationWizardStepThreeComponent implements OnInit, OnChanges {
  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;

  guardians: Guardian[] = [];
  newChildren: Child[] = [];
  existingChildren: Child[] = [];
  childrenToRegister: Child[] = [];
  relationshipTypes: DropdownItem[];

  constructor(
    private readonly commonService: CommonService,
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService
  ) {}

  ngOnInit(): void {
    this.wizard.wizardCancelled.subscribe(() => (this.childrenToRegister = []));
    this.relationshipTypes = this.commonService.getDropDownItems(Relationship, TranslationKey.RELATIONSHIP);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue === 2) {
      this.newChildren = this.wizardDataService.data.children.filter((c) => !c.id);
      this.existingChildren = this.wizardDataService.data.children.filter((c) => c.id);
      this.guardians = this.wizardDataService.data.guardians;

      if (this.newChildren && this.newChildren.length > 0) {
        this.newChildren.forEach((c) => (c.guardians = []));
      }
    }
  }

  onGuardianChildRelationshipChange(g: Guardian, c: Child, event: any) {
    const childGuardian: Guardian = { ...g };
    childGuardian.relationship = event.value;
    c.guardians = c.guardians ? c.guardians.filter((guardian) => guardian.email != childGuardian.email) : [];
    c.guardians.push(childGuardian);
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  goToChildInformation() {
    this.wizard.goToStep(2);
  }

  goToChildGuardianInformation() {
    this.wizard.goToStep(1);
  }

  onNextClick() {
    this.wizardDataService.updateData({ children: [...this.existingChildren, ...this.newChildren] });
    this.resetForms();
    this.wizard.next();
  }

  disableNext(): boolean {
    if (this.newChildren && this.newChildren.length > 0) {
      return !this.newChildren.every((c) => c.guardians && c.guardians.length === this.guardians.length);
    } else {
      return true;
    }
  }

  resetForms() {
    this.newChildren = [];
    this.guardians = [];
  }
}
