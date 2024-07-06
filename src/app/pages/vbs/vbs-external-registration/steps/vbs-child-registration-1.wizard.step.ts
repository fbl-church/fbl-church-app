import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSService } from 'src/service/vbs/vbs.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-one',
  templateUrl: './vbs-child-registration-1.wizard.step.html',
})
export class VBSChildRegistrationWizardStepOneComponent implements OnInit {
  @Input() wizard: WizardComponent;
  phoneForm: FormGroup;
  emailForm: FormGroup;

  searchLoading = false;
  collectEmailContact = true;
  usePhoneNumber = true;
  initailDetailsCollect = false;
  collectingGuardianInfo = false;

  newGuardianBaseInfo: Guardian;

  constructor(
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService,
    private readonly fb: FormBuilder,
    private readonly vbsService: VBSService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: [null, [Validators.required, Validators.minLength(14)]],
    });

    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.wizard.wizardCancelled.subscribe(() => this.reset());
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  nextStepGuardianExists(g: Guardian) {
    this.wizardDataService.clearData();
    this.wizardDataService.updateData({ guardians: [g], guardianExists: true });
    this.wizard.next();
  }

  onSearchClick(searchValue: any) {
    this.searchLoading = true;

    this.vbsService.getVBSGuardians(new Map().set('search', [searchValue])).subscribe({
      next: (res) => {
        if (res.body.length > 0) {
          this.nextStepGuardianExists(res.body[0]);
          this.reset();
        } else {
          this.initailDetailsCollect = true;
        }

        this.searchLoading = false;
      },
      error: () => {
        this.popupService.error('Unable to look up account at this time. Please try again later.');
        this.searchLoading = false;
      },
    });
  }

  onSecondarySearchClick(searchValue: any) {
    this.searchLoading = true;

    this.vbsService.getVBSGuardians(new Map().set('search', [searchValue])).subscribe({
      next: (res) => {
        if (res.body.length > 0) {
          this.nextStepGuardianExists(res.body[0]);
          this.reset();
        } else {
          this.newGuardianBaseInfo = {
            phone: this.phoneForm.value.phone.trim(),
            email: this.emailForm.value.email.trim(),
          };
          this.collectingGuardianInfo = true;
        }
      },
      error: () => {
        this.popupService.error('Unable to look up account at this time. Please try again later.');
        this.searchLoading = false;
      },
    });
  }

  onToggleFormClick() {
    this.resetForms();
    this.usePhoneNumber = !this.usePhoneNumber;
    this.collectEmailContact = this.usePhoneNumber;
  }

  resetForms() {
    this.phoneForm.reset();
    this.emailForm.reset();
  }

  reset() {
    this.resetForms();
    this.searchLoading = false;
    this.collectEmailContact = true;
    this.usePhoneNumber = true;
    this.initailDetailsCollect = false;
    this.collectingGuardianInfo = false;
  }
}
