import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian, VBSRegistration } from 'projects/insite-kit/src/model/user.model';
import { VBSService } from 'src/service/vbs/vbs.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-four',
  templateUrl: './vbs-child-registration-4.wizard.step.html',
})
export class VBSChildRegistrationWizardStepFourComponent implements OnChanges {
  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;
  @Input() loading = true;
  @Input() guardians: Guardian[];
  @Input() children: Child[];
  @Input() childExists = false;
  @Output() save = new EventEmitter<VBSRegistration>();

  childrenToRegister: Child[] = [];

  constructor(private readonly vbsService: VBSService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue === 3) {
      this.loading = true;
      this.childrenToRegister = [];

      const childrenExisting = this.children.filter((c) => c.id) || [];
      const childrenToCreate = this.children.filter((c) => !c.id) || [];

      if (childrenExisting.length > 0) {
        const childIds = childrenExisting.map((c) => c.id);
        this.vbsService.getChildren(new Map().set('id', childIds)).subscribe((res) => {
          res.body.forEach((ch) => {
            const vbsGroup = childrenExisting.find((c) => c.id === ch.id).churchGroup;
            ch.churchGroup = vbsGroup;
            this.childrenToRegister.push(ch);
            this.loading = false;
          });
        });
      } else {
        this.childrenToRegister = childrenToCreate;
        this.loading = false;
      }
    }
  }

  onCancelClick() {
    this.wizard.resetWizard();
  }

  onPreviousClick() {
    console.log(this.childExists);
    if (this.childExists) {
      this.wizard.goToStep(1);
    } else {
      this.wizard.prev();
    }
  }

  goToChildInformation() {
    this.wizard.goToStep(1);
  }

  goToChildGuardianInformation() {
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
