import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Child } from 'projects/insite-kit/src/model/child.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss'],
})
export class ChildFormComponent implements OnInit {
  @Input() childData: Child;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Child>();

  roles: string[];
  churchGroups: string[];
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.churchGroups = Object.keys(ChurchGroup);
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.childData?.firstName ? this.childData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.childData?.lastName ? this.childData.lastName : '',
        Validators.required,
      ],
      birthday: [
        this.childData?.birthday
          ? this.childData.birthday.toString().split('T')[0]
          : '',
        Validators.required,
      ],
      allergies: [this.childData ? this.childData.allergies : ''],
      additionalInfo: [this.childData ? this.childData.additionalInfo : ''],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let newChild: Child = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
    };

    if (this.form.value.birthday) {
      newChild.birthday = this.form.value.birthday;
    }

    if (this.form.value.allergies) {
      newChild.allergies = this.form.value.allergies;
    }

    if (this.form.value.additionalInfo) {
      newChild.additionalInfo = this.form.value.additionalInfo;
    }

    this.save.emit(newChild);
  }
}
