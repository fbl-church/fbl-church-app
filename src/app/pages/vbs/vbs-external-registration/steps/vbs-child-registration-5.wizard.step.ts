import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian, VBSRegistration } from 'projects/insite-kit/src/model/user.model';
import { VBSService } from 'src/service/vbs/vbs.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-five',
  templateUrl: './vbs-child-registration-5.wizard.step.html',
})
export class VBSChildRegistrationWizardStepFiveComponent implements OnChanges {
  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;
  @Input() loading = true;
  @Output() save = new EventEmitter<VBSRegistration>();

  childrenToRegister: Child[] = [];
  guardians: Guardian[];
  guardianExists = false;

  constructor(
    private readonly vbsService: VBSService,
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue === 4) {
      this.loading = true;
      this.childrenToRegister = [];
      this.guardianExists = this.wizardDataService.data.guardianExists;
      this.guardians = this.wizardDataService.data.guardians;

      const childrenExisting = this.wizardDataService.data.children.filter((c) => c.id) || [];
      const childrenToCreate = this.wizardDataService.data.children.filter((c) => !c.id) || [];

      if (childrenExisting.length > 0) {
        const childIds = childrenExisting.map((c) => c.id);
        this.vbsService.getChildren(new Map().set('id', childIds)).subscribe((res) => {
          this.processExistingChildren(res.body, childrenExisting);
          this.processNewChildren(childrenToCreate);
          this.loading = false;
        });
      } else {
        this.processNewChildren(childrenToCreate);
        this.loading = false;
      }
    }
  }

  processExistingChildren(foundChildren: Child[], selectedChildren: Child[]) {
    foundChildren.forEach((ch) => {
      ch.churchGroup = selectedChildren.find((c) => c.id === ch.id).churchGroup;
      this.childrenToRegister.push(ch);
    });
  }

  processNewChildren(newChildren: Child[]) {
    if (newChildren.length > 0) {
      this.childrenToRegister.push(...newChildren);
    }
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  onPreviousClick() {
    if (this.guardianExists) {
      const childrenToCreate: any[] = this.wizardDataService.data.children.filter((c) => !c.id) || [];
      if (childrenToCreate.length > 0) {
        this.wizard.prev();
      } else {
        this.wizard.goToStep(2);
      }
    } else {
      this.wizard.prev();
    }
  }

  goToChildGuardianInformation() {
    this.wizard.goToStep(1);
  }

  goToChildInformation() {
    this.wizard.goToStep(2);
  }

  onSaveClick() {
    const registration: VBSRegistration = {
      guardians: this.guardians,
      children: this.childrenToRegister,
    };
    this.save.emit(registration);
  }
}
