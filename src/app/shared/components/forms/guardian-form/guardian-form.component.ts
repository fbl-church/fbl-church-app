import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
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

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.guardianData ? this.guardianData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.guardianData ? this.guardianData.lastName : '',
        Validators.required,
      ],
      phone: [
        this.guardianData ? this.guardianData.phone : '',
        [Validators.required, Validators.minLength(14)],
      ],
      city: [
        this.guardianData ? this.guardianData.city : '',
        Validators.required,
      ],
      state: [
        this.guardianData
          ? this.states.find((s) => s.code === this.guardianData.state)
          : { name: 'OHIO', code: 'OH' },
        Validators.required,
      ],
      zipCode: [
        this.guardianData ? this.guardianData.zipCode : '',
        Validators.required,
      ],
      address: [this.guardianData ? this.guardianData.address : ''],
      email: [
        this.guardianData ? this.guardianData.email : '',
        Validators.email,
      ],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let guardian: Guardian = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      phone: this.form.value.phone.trim(),
      address: this.form.value.address.trim(),
      city: this.form.value.city.trim(),
      state: this.form.value.state.code,
      zipCode: this.form.value.zipCode.trim(),
    };

    if (this.form.value.email) {
      guardian.email = this.form.value.email.trim();
    }

    this.save.emit(guardian);
  }
}
