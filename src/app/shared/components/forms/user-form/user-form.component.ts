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
import { RoleService } from 'src/service/roles/roles.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
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

  form: FormGroup;

  WebRole = WebRole;
  roleSection: any[];

  constructor(
    private readonly popupService: PopupService,
    private readonly roleService: RoleService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.roleService.get().subscribe((res) => (this.roleSection = res.body));
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
      email: [this.userData ? this.userData.email : '', [Validators.email]],
      roles: [this.userData ? this.userData.webRole : ''],
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
    };

    if (this.form.value.email) {
      user.email = this.form.value.email.trim();
    }

    if (this.form.value.password) {
      emitSave = this.validPassword();
      user.password = this.form.value.password.trim();
    }

    if (this.enableRoleUpdate) {
      user.webRole = this.form.value.roles;
    } else {
      user.webRole = this.userData.webRole;
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
