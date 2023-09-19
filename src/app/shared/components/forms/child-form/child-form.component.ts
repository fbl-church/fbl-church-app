import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ChurchGroup,
  TranslationKey,
} from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
})
export class ChildFormComponent implements OnInit {
  @Input() childData: Child;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Child>();

  churchGroups: any[];
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.churchGroups = Object.keys(ChurchGroup).map((cg) => {
      return {
        value: cg,
        name: this.commonService.translate(cg, TranslationKey.CHURCH_GROUP),
      };
    });
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
          : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      allergies: [this.childData ? this.childData.allergies : ''],
      groups: [this.childData?.churchGroup ? this.childData.churchGroup : ''],
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

    if (this.form.value.groups) {
      newChild.churchGroup = this.form.value.groups;
    }

    this.save.emit(newChild);
  }
}
