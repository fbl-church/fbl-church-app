import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-to-gurdian-modal',
  templateUrl: './user-to-gurdian-modal.component.html',
})
export class UserToGurdianModalComponent implements OnInit {
  @ViewChild('userToGurdianModal') modal: ModalComponent;
  @Input() user: User;

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly gurdianService: GurdianService,
    private readonly commonService: CommonService,
    private readonly popupService: PopupService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  open(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.modal.open();
      this.currentUser = res.body;
      this.form.controls.name.patchValue(
        this.commonService.getFormattedName(res.body)
      );
    });
  }

  onUserToGurdianClick() {
    this.modalLoading = true;
    this.gurdianService
      .assignGurdianRoleToExistingUser(this.currentUser.id, {
        phone: this.form.value.phone,
      })
      .subscribe({
        next: () => {
          this.popupService.success(
            'User succesfully assigned a gurdian role!'
          );
          this.modal.close();
          this.modalLoading = false;
          this.router.navigate([`/gurdians/${this.currentUser.id}/details`]);
        },

        error: () => {
          this.popupService.error(
            'Unable to add gurdian role to user at this time. Try again later.'
          );
          this.modal.close();
          this.modalLoading = false;
        },
      });
    this.modal.close();
  }

  buildForm() {
    this.form = this.fb.group({
      name: '',
      phone: ['', [Validators.required, Validators.minLength(14)]],
    });
  }
}
