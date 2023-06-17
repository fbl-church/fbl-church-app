import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/child.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-create-gurdian',
  templateUrl: './create-gurdian.component.html',
})
export class CreateGurdianComponent implements OnInit {
  loading = true;
  disableSave = false;

  constructor(
    private readonly gurdianService: GurdianService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  onCancelClick() {
    this.router.navigate(['/gurdians']);
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
