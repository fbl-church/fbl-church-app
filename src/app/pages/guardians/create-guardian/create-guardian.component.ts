import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-create-guardian',
  templateUrl: './create-guardian.component.html',
})
export class CreateGuardianComponent {
  loading = false;
  disableSave = false;

  existingUserIcon = faUserPen;

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
    this.loading = true;
    this.disableSave = true;

    this.guardianService.create(guardian).subscribe({
      next: (res) => {
        this.router.navigate([`/guardians/${res.id}/details`]);
        this.popupService.success('Guardian Successfully created!');
      },
      error: () => {
        this.popupService.error('Guardian could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    });
  }
}
