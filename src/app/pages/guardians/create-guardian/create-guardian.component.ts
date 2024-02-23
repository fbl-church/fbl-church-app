import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-create-guardian',
  templateUrl: './create-guardian.component.html',
})
export class CreateGuardianComponent {
  @ViewChild('duplicateGuardianModal') duplicateGuardianModal: ModalComponent;

  loading = false;

  savedGuardianData: Guardian;
  duplicateGuardian: Guardian;

  constructor(
    private readonly guardianService: GuardianService,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.navigationService.navigate('/guardians');
  }

  onExistingUserClick() {
    this.navigationService.navigate('/guardians/create/existing-user');
  }

  onSaveClick(guardian: Guardian) {
    this.loading = true;
    this.savedGuardianData = guardian;

    this.guardianService.create(this.savedGuardianData).subscribe({
      next: (guardian) => {
        this.navigationService.navigate(`/guardians/${guardian.id}/details`);
        this.popupService.success('Guardian Successfully created!');
      },
      error: () => {
        this.popupService.error('Guardian could not be created!');
        this.loading = false;
      },
    });
  }
}
