import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() enableRoleUpdate = true;
  @Input() enablePasswordUpdate = true;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];
  form: FormGroup;

  WebRole = WebRole;

  constructor(
    private readonly userService: UserService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.roles = this.userService.getAllowedRolesToCreate();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.userData ? this.userData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.userData ? this.userData.lastName : '',
        Validators.required,
      ],
      email: [
        this.userData ? this.userData.email : '',
        [Validators.required, Validators.email],
      ],
    });

    if (this.enablePasswordUpdate) {
      this.form.addControl(
        'password',
        new FormControl('', Validators.required)
      );
    }
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let emitSave = true;

    let user: User = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      email: this.form.value.email.trim(),
    };

    if (this.form.value.email) {
      user.email = this.form.value.email.trim();
    }

    if (this.form.value.password) {
      emitSave = this.validPassword();
      user.password = this.form.value.password.trim();
    }

    if (this.form.value.webRole) {
      user.webRole = this.form.value.webRole.trim();
    }

    if (emitSave) {
      this.save.emit(user);
    }
  }

  validPassword() {
    if (this.form.value.password.toString().length < 8) {
      this.popupService.error(
        'Password needs to have a length of at least 8 characters.'
      );
      return false;
    }
    return true;
  }
}
