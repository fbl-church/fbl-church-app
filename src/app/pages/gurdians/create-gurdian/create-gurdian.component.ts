import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-create-gurdian',
  templateUrl: './create-gurdian.component.html',
})
export class CreateGurdianComponent {
  loading = false;
  disableSave = false;

  existingUserIcon = faUserPen;

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/gurdians']);
  }

  onExistingUserClick() {
    this.router.navigate(['gurdians/create/existing-user']);
  }

  onSaveClick(gurdian: Gurdian) {
    this.loading = true;
    this.disableSave = true;

    this.gurdianService.create(gurdian).subscribe({
      next: (res) => {
        this.router.navigate([`/gurdians/${res.id}/details`]);
        this.popupService.success('Gurdian Successfully created!');
      },
      error: () => {
        this.popupService.error('Gurdian could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    });
  }
}
