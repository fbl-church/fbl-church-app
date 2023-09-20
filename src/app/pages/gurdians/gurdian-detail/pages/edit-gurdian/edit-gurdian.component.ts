import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-edit-gurdian',
  templateUrl: './edit-gurdian.component.html',
})
export class EditGurdianComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  gurdianId: number;
  gurdianUpdating: Gurdian;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly gurdianService: GurdianService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.gurdian.body),
        tap((res) => (this.gurdianId = res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((g) => {
        this.gurdianUpdating = g;
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

  onSaveClick(gurdian: Gurdian) {
    this.loading = true;
    this.gurdianService.update(this.gurdianId, gurdian).subscribe({
      next: () => {
        this.location.back();
        this.popupService.success('Gurdian Successfully updated!');
      },
      error: () => {
        this.popupService.error('Gurdian could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
