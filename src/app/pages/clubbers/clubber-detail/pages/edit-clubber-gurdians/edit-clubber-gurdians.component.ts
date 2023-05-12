import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/clubber.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClubberGurdiansGridCardComponent } from 'src/app/shared/components/cards/clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';

@Component({
  selector: 'app-edit-clubber-gurdians',
  templateUrl: './edit-clubber-gurdians.component.html',
})
export class EditClubberGurdiansComponent implements OnInit, OnDestroy {
  @ViewChild(ClubberGurdiansGridCardComponent)
  gurdianSelectionGrid: ClubberGurdiansGridCardComponent;

  loading = true;
  destroy = new Subject<void>();
  gurdiansUpdating: Gurdian[];
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.gurdians.body),
        takeUntil(this.destroy)
      )
      .subscribe((gurdians) => {
        this.gurdiansUpdating = gurdians;
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

  onUpdateClick() {}

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
