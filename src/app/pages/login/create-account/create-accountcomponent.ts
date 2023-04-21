import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  form: FormGroup;
  loading = false;
  roles: any;

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.roles = this.userService.getRegisterRoles();
    this.loading = false;
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      webRole: [WebRole[WebRole.USER].toUpperCase(), Validators.required],
      password: ['', Validators.required],
    });
  }

  onCreateAccountClick() {
    this.loading = true;
    const user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      webRole: this.form.value.webRole,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.userService.register(user).subscribe({
      next: (res) => {
        this.loading = false;
        this.popupService.success('Account successfully created!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.popupService.error(
          'Could not create account at this time. Try again later.'
        );
      },
    });
  }
}
