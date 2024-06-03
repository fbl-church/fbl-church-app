import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { US_STATES } from 'src/app/shared/utils/states.service';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { DuplicateGuardianModalComponent } from '../../modals/duplicate-guardian-modal/duplicate-guardian-modal.component';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
})
export class GuardianFormComponent implements OnInit {
  @ViewChild(DuplicateGuardianModalComponent)
  duplicateGuardianModal: DuplicateGuardianModalComponent;

  @Input() guardianData: Guardian;
  @Input() duplicateCheck = true;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() loading = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Guardian>();

  form: FormGroup;
  states = US_STATES;
  savedGuardianData: Guardian;
  disableSave = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly guardianService: GuardianService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [this.guardianData?.firstName ? this.guardianData.firstName : '', Validators.required],
      lastName: [this.guardianData?.lastName ? this.guardianData.lastName : '', Validators.required],
      phone: [
        this.guardianData?.phone ? this.guardianData.phone : '',
        {
          validators: [Validators.required, Validators.minLength(14)],
          asyncValidators: createUniqueValidator('duplicate', (value) =>
            this.guardianService.doesPhoneNumberExist(value)
          ),
        },
      ],
      city: [this.guardianData?.city ? this.guardianData.city : ''],
      state: [
        this.guardianData?.state
          ? this.states.find((s) => s.code === this.guardianData.state)
          : { name: 'OHIO', code: 'OH' },
      ],
      zipCode: [this.guardianData?.zipCode ? this.guardianData.zipCode : ''],
      address: [this.guardianData?.address ? this.guardianData.address : ''],
      email: [this.guardianData?.email ? this.guardianData.email : '', Validators.email],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    this.disableSave = true;
    this.loadingChange.emit(true);

    const guardian: Guardian = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      phone: this.form.value.phone.trim(),
    };

    if (this.form.value.email) {
      guardian.email = this.form.value.email.trim();
    }

    const validAddress = this.isValidAddressField();
    if (!!this.form.value.address.trim() && validAddress) {
      guardian.address = this.form.value.address.trim();
      guardian.city = this.form.value.city.trim();
      guardian.state = this.form.value.state.code;
      guardian.zipCode = this.form.value.zipCode.trim();
    }

    if (validAddress) {
      this.savedGuardianData = guardian;
      if (this.duplicateCheck) {
        this.guardianService.doesGuardianExist(this.savedGuardianData).subscribe((g) => {
          if (g.body) {
            this.duplicateGuardianModal.open(g.body);
            this.loadingChange.emit(false);
          } else {
            this.saveGuardian();
          }
          this.disableSave = false;
        });
      } else {
        this.saveGuardian();
      }
    }
  }

  saveGuardian() {
    this.save.emit(this.savedGuardianData);
  }

  isValidAddressField() {
    if (!!this.form.value.address.trim()) {
      if (!this.form.value.city.trim() || !this.form.value.state.code || !this.form.value.zipCode.trim()) {
        this.popupService.error('Address field requires City, State, and Zip Code to be filled out.');
        return false;
      }
    }
    return true;
  }
}
