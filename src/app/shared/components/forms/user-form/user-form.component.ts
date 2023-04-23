import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableRoleUpdate = false;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<User>();

  roles: string[];
  form: FormGroup;

  WebRole = WebRole;

  constructor(
    private readonly userService: UserService,
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
      email: [this.userData ? this.userData.email : '', Validators.required],
      password: ['', Validators.required],
      webRole: this.userData
        ? this.userData.webRole.toUpperCase()
        : WebRole[WebRole.USER].toUpperCase(),
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    let user: User = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
      webRole: this.form.getRawValue().webRole,
    };

    if (this.form.value.email) {
      user.email = this.form.value.email.trim();
    }

    this.save.emit(user);
  }
}
