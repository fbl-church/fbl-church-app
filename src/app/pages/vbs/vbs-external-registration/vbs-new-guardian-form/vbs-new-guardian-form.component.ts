import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { UserService } from 'src/service/users/user.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-new-guardian-form',
  templateUrl: './vbs-new-guardian-form.component.html',
})
export class VBSNewGuardianFormComponent implements OnInit, OnChanges {
  @ViewChild('duplicateGuardianInformationModal') duplicateGuardianInformationModal: ModalComponent;
  @ViewChild('duplicateEmailModal') duplicateEmailModal: ModalComponent;

  @Input() guardian: Guardian;
  @Input() wizard: WizardComponent;
  @Input() requireEmail = true;
  @Input() activeStep: number = 0;

  guardianForms: FormGroup[] = [];

  constructor(
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly guardianService: GuardianService
  ) {}

  ngOnInit() {
    this.wizard.wizardCancelled.subscribe(() => (this.guardianForms = []));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue == 0) {
      if (this.guardianForms.length === 0) {
        this.addGuardianForm();
      }
    }

    if (changes.guardian && changes.guardian.currentValue) {
      if (this.guardianForms.length > 0) {
        this.guardianForms = [];
      }
      this.addGuardianForm(this.guardian);
    }
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  onNextClick() {
    if (this.hasDuplicateGuardianInformation()) {
      this.duplicateGuardianInformationModal.open();
    } else if (this.hasDuplicateEmail()) {
      this.duplicateEmailModal.open();
    } else {
      this.wizardDataService.updateData({ guardians: this.getCreatedGuardians(), guardianExists: false });
      this.wizard.next();
    }
  }

  private getCreatedGuardians(): Guardian[] {
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

  addGuardianForm(g?: Guardian) {
    const newGuardianForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        g?.email || '',
        {
          validators: [Validators.email],
          asyncValidators: createUniqueValidator('duplicate', (value) => this.userService.doesEmailExist(value)),
        },
      ],
      phone: [
        g?.phone || '',
        {
          validators: [Validators.required, Validators.minLength(14)],
          asyncValidators: createUniqueValidator('duplicate', (value) =>
            this.guardianService.doesPhoneNumberExist(value)
          ),
        },
      ],
    });

    if (this.requireEmail) {
      newGuardianForm.addValidators(Validators.required);
    }

    this.guardianForms.push(newGuardianForm);
  }

  onRemoveGuardianClick(index: any) {
    this.guardianForms.splice(index, 1);
  }

  disableNext(): boolean {
    return !this.guardianForms.map((f) => f.valid).every((validForm) => validForm);
  }

  private hasDuplicateGuardianInformation() {
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

  private hasDuplicateEmail() {
    const unqiueEmail = new Set(this.guardianForms.map((form) => form.value.email.toLocaleLowerCase()));
    return unqiueEmail.size !== this.guardianForms.length;
  }
}
