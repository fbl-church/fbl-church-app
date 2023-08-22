import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { US_STATES } from 'src/app/shared/utils/states.service';

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
  states = US_STATES;

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
        [Validators.required, Validators.minLength(14)],
      ],
      city: [
        this.gurdianData ? this.gurdianData.city : '',
        Validators.required,
      ],
      state: [
        this.gurdianData
          ? this.states.find((s) => s.code === this.gurdianData.state)
          : { name: 'OHIO', code: 'OH' },
        Validators.required,
      ],
      zipCode: [
        this.gurdianData ? this.gurdianData.zipCode : '',
        Validators.required,
      ],
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
      address: this.form.value.address.trim(),
      city: this.form.value.city.trim(),
      state: this.form.value.state.code,
      zipCode: this.form.value.zipCode.trim(),
    };

    this.save.emit(gurdian);
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.code.toLocaleLowerCase().indexOf(term) > -1 ||
      item.name.toLocaleLowerCase().indexOf(term) > -1
    );
  }
}
