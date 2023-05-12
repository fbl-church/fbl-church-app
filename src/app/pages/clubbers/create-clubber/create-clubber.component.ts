import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ClubberGurdiansGridCardComponent } from 'src/app/shared/components/cards/clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-create-clubber',
  templateUrl: './create-clubber.component.html',
})
export class CreateClubberComponent implements OnInit {
  @ViewChild(ClubberGurdiansGridCardComponent)
  gurdianSelectionGrid: ClubberGurdiansGridCardComponent;

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
    this.router.navigate(['/clubbers']);
  }

  onSaveClick(clubber: Clubber) {
    const gurdians = this.gurdianSelectionGrid.getSelectedGurdians();
    if (!this.validGurdians(gurdians)) {
      return;
    }
    clubber.gurdians = gurdians;

    this.loading = true;
    this.disableSave = true;
    this.clubberService.create(clubber).subscribe({
      next: () => {
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

  validGurdians(gurdians: any[]): boolean {
    if (gurdians.length < 1) {
      this.popupService.error(
        'Clubber is required to have at least one gurdian assigned to them.'
      );
      return false;
    }

    if (gurdians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected gurdians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
