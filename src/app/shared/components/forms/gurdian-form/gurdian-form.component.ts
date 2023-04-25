import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gurdian } from 'projects/insite-kit/src/model/clubber.model';

@Component({
  selector: 'app-gurdian-form',
  templateUrl: './gurdian-form.component.html',
})
export class GurdianFormComponent implements OnInit {
  @Input() gurdianData: Gurdian;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Gurdian>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.gurdianData ? this.gurdianData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.gurdianData ? this.gurdianData.lastName : '',
        Validators.required,
      ],
      phone: [
        this.gurdianData ? this.gurdianData.phone : '',
        [Validators.required, Validators.minLength(10)],
      ],
      email: [this.gurdianData ? this.gurdianData.email : ''],
      address: [this.gurdianData ? this.gurdianData.address : ''],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let gurdian: Gurdian = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      phone: this.form.value.phone.trim(),
    };

    if (this.form.value.email) {
      gurdian.email = this.form.value.email.trim();
    }

    if (this.form.value.address) {
      gurdian.address = this.form.value.address.trim();
    }

    this.save.emit(gurdian);
  }
}
