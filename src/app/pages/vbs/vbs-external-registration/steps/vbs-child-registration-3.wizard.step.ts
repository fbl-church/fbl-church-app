import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-three',
  templateUrl: './vbs-child-registration-3.wizard.step.html',
})
export class VBSChildRegistrationWizardStepThreeComponent implements OnChanges, OnInit {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;

  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;
  @Output() next = new EventEmitter<Guardian[]>();

  guardianForms: FormGroup[] = [];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.wizard.wizardCancelled.subscribe(() => (this.guardianForms = []));
  }

  ngOnChanges() {
    if (this.activeStep === 2 && this.guardianForms.length === 0) {
      this.addGuardianForm();
    }
  }

  onCancelClick() {
    this.wizard.resetWizard();
  }

  addGuardianForm() {
    const newGuardianForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.minLength(14)]],
    });
    this.guardianForms.push(newGuardianForm);
  }

  onRemoveChildClick(index: any) {
    this.guardianForms.splice(index, 1);
  }

  onNextClick() {
    this.next.emit(this.getCreatedGuardians());
  }

  getCreatedGuardians(): Guardian[] {
    return this.guardianForms.map((form, i) => {
      let newGuardian: Guardian = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
      };
      return newGuardian;
    });
  }

  disableNext(): boolean {
    return !this.guardianForms.map((f) => f.valid).every((validForm) => validForm);
  }
}
