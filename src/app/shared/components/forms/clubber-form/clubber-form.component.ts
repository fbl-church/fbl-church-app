import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';

@Component({
  selector: 'app-clubber-form',
  templateUrl: './clubber-form.component.html',
  styleUrls: ['./clubber-form.component.scss'],
})
export class ClubberFormComponent implements OnInit {
  @Input() clubberData: Clubber;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Clubber>();

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
        this.clubberData?.firstName ? this.clubberData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.clubberData?.lastName ? this.clubberData.lastName : '',
        Validators.required,
      ],
      churchGroup: [
        this.clubberData?.churchGroup
          ? this.clubberData.churchGroup
          : ChurchGroup.CUBBIES,
        Validators.required,
      ],
      birthday: this.clubberData?.birthday
        ? this.clubberData.birthday.toString().split('T')[0]
        : '',
      allergies: [this.clubberData ? this.clubberData.allergies : ''],
      additionalInfo: [this.clubberData ? this.clubberData.additionalInfo : ''],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let newClubber: Clubber = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      churchGroup: this.form.value.churchGroup,
    };

    if (this.form.value.birthday) {
      newClubber.birthday = this.form.value.birthday;
    }

    if (this.form.value.allergies) {
      newClubber.allergies = this.form.value.allergies;
    }

    if (this.form.value.additionalInfo) {
      newClubber.additionalInfo = this.form.value.additionalInfo;
    }

    this.save.emit(newClubber);
  }
}
