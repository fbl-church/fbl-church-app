import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-edit-clubber',
  templateUrl: './edit-clubber.component.html',
})
export class EditClubberComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  clubberId: number;
  clubberUpdating: Clubber;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly clubberService: ClubberService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user.body),
        tap((res) => (this.clubberId = res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
        this.clubberUpdating = user;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.resetStatus();
    this.location.back();
  }

  onSaveClick(clubber: Clubber) {
    this.loading = true;
    this.clubberService.updateClubber(this.clubberId, clubber).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('Clubber Successfully updated!');
        this.loading = false;
      },
      error: () => {
        this.popupService.error('Clubber could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
