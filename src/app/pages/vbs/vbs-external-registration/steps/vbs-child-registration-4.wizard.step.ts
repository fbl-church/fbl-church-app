import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { VBSService } from 'src/service/vbs/vbs.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-four',
  templateUrl: './vbs-child-registration-4.wizard.step.html',
})
export class VBSChildRegistrationWizardStepFourComponent implements OnChanges {
  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;
  @Input() guardians: Guardian[];
  @Input() children: Child[];
  @Input() childExists = false;
  @Output() save = new EventEmitter<Child[]>();
  @Output() previous = new EventEmitter<void>();

  childrenToRegister: Child[] = [];
  loading = true;

  constructor(private readonly vbsService: VBSService) {}

  ngOnChanges() {
    this.loading = true;
    this.childrenToRegister = [];

    if (this.activeStep === 3) {
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
    this.previous.next();
  }

  goToChildInformation() {
    this.wizard.goToStep(1);
  }

  goToChildGuardianInformation() {
    this.wizard.goToStep(2);
  }

  onSaveClick() {
    this.save.emit(this.childrenToRegister);
  }
}
