import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-edit-guardian',
  templateUrl: './edit-guardian.component.html',
})
export class EditGuardianComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  guardianId: number;
  guardianUpdating: Guardian;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly guardianService: GuardianService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.guardian.body),
        tap((res) => (this.guardianId = res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((g) => {
        this.guardianUpdating = g;
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

  onSaveClick(guardian: Guardian) {
    this.loading = true;
    this.guardianService.update(this.guardianId, guardian).subscribe({
      next: () => {
        this.location.back();
        this.popupService.success('Guardian Successfully updated!');
      },
      error: () => {
        this.popupService.error('Guardian could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
