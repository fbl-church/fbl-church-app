import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Observer, iif, of, switchMap } from 'rxjs';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-create-guardian',
  templateUrl: './create-guardian.component.html',
})
export class CreateGuardianComponent {
  @ViewChild('duplicateGuardianModal') duplicateGuardianModal: ModalComponent;

  loading = false;
  disableSave = false;

  savedGuardianData: Guardian;
  duplicateGuardian: Guardian;

  constructor(
    private readonly guardianService: GuardianService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/guardians']);
  }

  onExistingUserClick() {
    this.router.navigate(['/guardians/create/existing-user']);
  }

  onSaveClick(guardian: Guardian) {
    this.savedGuardianData = guardian;
    this.duplicateGuardian = null;

    this.guardianService
      .doesGuardianExist(this.savedGuardianData)
      .pipe(
        switchMap((u) =>
          iif(
            () => !!u.body,
            this.onDuplicateGuardian(u.body),
            this.createGuardian(!!u.body)
          )
        )
      )
      .subscribe(this.childCreationObserver());
  }

  onDuplicateGuardian(guardian: Guardian) {
    if (!!guardian) {
      this.loading = false;
      this.disableSave = false;
      this.duplicateGuardian = guardian;
      this.duplicateGuardianModal.open();
    }

    return of(null);
  }

  onDuplicateGuardianAcknowledgement() {
    this.loading = true;
    this.disableSave = true;
    this.duplicateGuardianModal.close();
    this.createGuardian().subscribe(this.childCreationObserver());
  }

  createGuardian(duplicateGuardian = false) {
    if (!duplicateGuardian) {
      this.loading = true;
      this.disableSave = true;
    }
    return this.guardianService.create(this.savedGuardianData);
  }

  childCreationObserver(): Partial<Observer<Guardian>> {
    return {
      next: (guardian) => {
        if (!!guardian) {
          this.router.navigate([`/guardians/${guardian.id}/details`]);
          this.popupService.success('Guardian Successfully created!');
        }
      },
      error: () => {
        this.popupService.error('Guardian could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    };
  }
}
