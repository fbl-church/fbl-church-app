import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { US_STATES } from 'src/app/shared/utils/states.service';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
})
export class GuardianFormComponent implements OnInit {
  @Input() guardianData: Guardian;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Guardian>();

  form: FormGroup;
  states = US_STATES;

  constructor(
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.guardianData?.firstName ? this.guardianData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.guardianData?.lastName ? this.guardianData.lastName : '',
        Validators.required,
      ],
      phone: [
        this.guardianData?.phone ? this.guardianData.phone : '',
        [Validators.required, Validators.minLength(14)],
      ],
      city: [this.guardianData?.city ? this.guardianData.city : ''],
      state: [
        this.guardianData
          ? this.states.find((s) => s.code === this.guardianData.state)
          : { name: 'OHIO', code: 'OH' },
      ],
      zipCode: [this.guardianData?.zipCode ? this.guardianData.zipCode : ''],
      address: [this.guardianData?.address ? this.guardianData.address : ''],
      email: [
        this.guardianData?.email ? this.guardianData.email : '',
        Validators.email,
      ],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
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
      this.save.emit(guardian);
    }
  }

  isValidAddressField() {
    if (!!this.form.value.address.trim()) {
      if (
        !this.form.value.city.trim() ||
        !this.form.value.state.code ||
        !this.form.value.zipCode.trim()
      ) {
        this.popupService.error(
          'Address field requires City, State, and Zip Code to be filled out.'
        );
        return false;
      }
    }
    return true;
  }
}
