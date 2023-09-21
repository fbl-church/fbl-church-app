import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Relationship,
  TranslationKey,
} from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { US_STATES } from 'src/app/shared/utils/states.service';

@Component({
  selector: 'app-child-gurdian-form',
  templateUrl: './child-gurdian-form.component.html',
})
export class ChildGurdianFormComponent implements OnInit {
  form: FormGroup;
  states = US_STATES;
  mappedRelationships: any[];

  get invalid() {
    return this.form ? this.form.invalid : true;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.mappedRelationships = Object.keys(Relationship).map((v) => {
      return {
        name: this.commonService.translate(v, TranslationKey.RELATIONSHIP),
        value: v,
      };
    });
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      relationship: ['', Validators.required],
      city: ['', Validators.required],
      state: [{ name: 'OHIO', code: 'OH' }, Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
      address: [''],
      email: ['', Validators.email],
    });
  }

  getGurdianFormData(): Gurdian {
    return {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      email: this.form.value.email.trim(),
      relationship: this.form.value.relationship.value,
      phone: this.form.value.phone.trim(),
      address: this.form.value.address.trim(),
      city: this.form.value.city.trim(),
      state: this.form.value.state.code,
      zipCode: this.form.value.zipCode.trim(),
    };
  }
}
