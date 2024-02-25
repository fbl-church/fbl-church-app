import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(
    private readonly navigationService: NavigationService,
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
    this.navigationService.back('/guardians');
  }

  onSaveClick(guardian: Guardian) {
    this.loading = true;
    this.guardianService.update(this.guardianId, guardian).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('Guardian Successfully updated!');
      },
      error: () => {
        this.popupService.error('Guardian could not be updated at this time!');
        this.loading = false;
      },
    });
  }
}
