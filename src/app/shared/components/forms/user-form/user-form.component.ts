import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { ThemeType, User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { RoleService } from 'src/service/roles/roles.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() enableRoleUpdate = true;
  @Input() enableAccessUpdate = true;
  @Input() enabledThemeChange = true;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  form: FormGroup;

  showThemeChangeBanner = false;
  WebRole = WebRole;
  roleSection: any[];

  readonly NOT_ASSIGNABLE_ROLES = [WebRole.GUARDIAN, WebRole.CHILD];

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
      firstName: [this.userData ? this.userData.firstName : '', Validators.required],
      lastName: [this.userData ? this.userData.lastName : '', Validators.required],
      email: [this.userData ? this.userData.email : '', [Validators.required, Validators.email]],
      roles: [this.userData ? this.userData.webRole.filter((r) => !this.NOT_ASSIGNABLE_ROLES.includes(r)) : ''],
      theme: [this.userData?.theme ? this.userData.theme : ThemeType.LIGHT, Validators.required],
      appAccess: [this.userData ? this.userData.appAccess : true],
    });

    this.form.controls.theme.valueChanges.subscribe((res) => (this.showThemeChangeBanner = true));
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let emitSave = true;

    let user: User = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      appAccess: this.form.value.appAccess,
      theme: this.form.value.theme,
    };

    if (this.form.value.email) {
      user.email = this.form.value.email.trim();
    }

    if (this.form.value.password) {
      emitSave = this.validPassword();
      user.password = this.form.value.password.trim();
    }

    if (this.enableRoleUpdate) {
      const rolesToAdd = this.userData?.webRole
        ? this.userData.webRole.filter((r) => this.NOT_ASSIGNABLE_ROLES.includes(r))
        : [];

      user.webRole = [...rolesToAdd, ...this.form.value.roles];
    } else {
      user.webRole = this.userData.webRole;
    }

    if (emitSave) {
      this.save.emit(user);
    }
  }

  validPassword() {
    if (this.form.value.password.toString().length < 8) {
      this.popupService.error('Password needs to have a length of at least 8 characters.');
      return false;
    }
    return true;
  }
}
