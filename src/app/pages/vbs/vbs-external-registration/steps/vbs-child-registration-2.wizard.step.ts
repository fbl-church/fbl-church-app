import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { VBSService } from 'src/service/vbs/vbs.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-two',
  templateUrl: './vbs-child-registration-2.wizard.step.html',
})
export class VBSChildRegistrationWizardStepTwoComponent implements OnChanges, OnInit {
  @ViewChild('duplicateGuardianInformationModal') duplicateGuardianInformationModal: ModalComponent;
  @ViewChild('duplicateEmailModal') duplicateEmailModal: ModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;

  guardianDataloader: any;
  childExists = false;
  guardianForms: FormGroup[] = [];

  constructor(
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService,
    private readonly vbsService: VBSService,
    private readonly fb: FormBuilder
  ) {
    this.guardianDataloader = (params) => this.vbsService.getVBSGuardians(params);
  }

  ngOnInit() {
    this.wizard.wizardCancelled.subscribe(() => {
      if (this.childExists) {
        this.grid.resetGrid();
      } else {
        this.guardianForms = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue == 1) {
      this.childExists = this.wizardDataService.data.childExists;
      if (this.guardianForms.length === 0) {
        this.addGuardianForm();
      }
    }
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  onGridRowClick(g: Guardian) {
    this.wizardDataService.updateData({ guardians: [g] });
    this.wizard.next();
  }

  onNextClick() {
    if (this.hasDuplicateGuardianInformation()) {
      this.duplicateGuardianInformationModal.open();
    } else if (this.hasDuplicateEmail()) {
      this.duplicateEmailModal.open();
    } else {
      this.wizardDataService.updateData({ guardians: this.getCreatedGuardians() });
      this.wizard.next();
    }
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

  onRemoveGuardianClick(index: any) {
    this.guardianForms.splice(index, 1);
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

  hasDuplicateGuardianInformation() {
    const uniqueData = new Set(
      this.guardianForms.map((form) =>
        JSON.stringify({
          firstName: form.value.firstName.toLocaleLowerCase(),
          lastName: form.value.lastName.toLocaleLowerCase(),
        })
      )
    );

    return uniqueData.size !== this.guardianForms.length;
  }

  hasDuplicateEmail() {
    const unqiueEmail = new Set(this.guardianForms.map((form) => form.value.email.toLocaleLowerCase()));
    return unqiueEmail.size !== this.guardianForms.length;
  }
}
