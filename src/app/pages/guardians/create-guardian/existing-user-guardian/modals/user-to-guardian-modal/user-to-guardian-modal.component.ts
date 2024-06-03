import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-to-guardian-modal',
  templateUrl: './user-to-guardian-modal.component.html',
})
export class UserToGuardianModalComponent implements OnInit {
  @ViewChild('userToGuardianModal') modal: ModalComponent;
  @Input() user: User;

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly guardianService: GuardianService,
    private readonly commonService: CommonService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  open(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.modal.open();
      this.currentUser = res.body;
      this.form.controls.name.patchValue(this.commonService.getFormattedName(res.body));
    });
  }

  onUserToGuardianClick() {
    this.modalLoading = true;
    this.guardianService
      .assignGuardianRoleToExistingUser(this.currentUser.id, {
        phone: this.form.value.phone.slice(0, 14),
      })
      .subscribe({
        next: () => {
          this.navigationService.navigate(`/guardians/${this.currentUser.id}/details`, false);
          this.popupService.success('User succesfully assigned Guardian role!');
          this.modal.close();
        },

        error: () => {
          this.popupService.error('Unable to add guardian role to user at this time. Try again later.');
          this.modalLoading = false;
          this.modal.close();
        },
      });
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
    });
  }
}
