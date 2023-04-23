import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-create-clubber',
  templateUrl: './create-clubber.component.html',
})
export class CreateClubberComponent implements OnInit {
  loading = true;
  disableSave = false;

  constructor(
    private readonly clubberService: ClubberService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  onCancelClick() {
    this.router.navigate(['/users']);
  }

  onSaveClick(clubber: Clubber) {
    this.loading = true;
    this.disableSave = true;

    this.clubberService.create(clubber).subscribe({
      next: (res) => {
        this.router.navigate([`/clubbers`]);
        this.popupService.success('Clubber Successfully created!');
      },
      error: () => {
        this.popupService.error('Clubber could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    });
  }
}
