import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DropdownItem } from 'projects/insite-kit/src/component/select/dropdown-item.model';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Relationship, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-four',
  templateUrl: './vbs-child-registration-4.wizard.step.html',
})
export class VBSChildRegistrationWizardStepFourComponent implements OnInit, OnChanges {
  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;

  guardians: Guardian[] = [];
  children: Child[] = [];
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
    if (changes.activeStep && changes.activeStep.currentValue === 3) {
      this.children = this.wizardDataService.data.children;
      this.guardians = this.wizardDataService.data.guardians;
      if (this.children && this.children.length > 0) {
        this.children.forEach((c) => (c.guardians = []));
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
    this.wizard.goToStep(1);
  }

  goToChildGuardianInformation() {
    this.wizard.goToStep(2);
  }

  onNextClick() {
    this.wizardDataService.updateData({ children: this.children });
    this.resetForms();
    this.wizard.next();
  }

  disableNext(): boolean {
    if (this.children && this.children.length > 0) {
      return !this.children.every((c) => c.guardians && c.guardians.length === this.guardians.length);
    } else {
      return true;
    }
  }

  resetForms() {
    this.children = [];
    this.guardians = [];
  }
}
