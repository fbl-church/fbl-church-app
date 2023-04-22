import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { ClubberService } from 'src/service/clubbers/clubber.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-clubber-form',
  templateUrl: './clubber-form.component.html',
  styleUrls: ['./clubber-form.component.scss'],
})
export class ClubberFormComponent implements OnInit {
  @Input() clubberData: Clubber;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];
  churchGroups: string[];
  form: FormGroup;

  constructor(
    private readonly clubberService: ClubberService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.roles = this.userService.getAllowedRolesToCreate();
    this.churchGroups = Object.keys(ChurchGroup);
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.clubberData ? this.clubberData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.clubberData ? this.clubberData.lastName : '',
        Validators.required,
      ],
      churchGroup: [
        this.clubberData ? this.clubberData.churchGroup : ChurchGroup.CUBBIES,
        Validators.required,
      ],
      birthday: this.clubberData
        ? this.clubberData.birthday.toString().split('T')[0]
        : '',
      allergies: [this.clubberData ? this.clubberData.allergies : ''],
      additionalInfo: [this.clubberData ? this.clubberData.additionalInfo : ''],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {}
}
