import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-edit-child-guardians',
  templateUrl: './edit-child-guardians.component.html',
})
export class EditChildGuardiansComponent implements OnInit, OnDestroy {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;

  loading = true;
  destroy = new Subject<void>();
  guardiansUpdating: Guardian[];
  childId: number;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly guardianService: GuardianService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params
      .pipe(
        tap((p) => (this.childId = p.id)),
        switchMap((res) => this.route.data),
        map((res) => res.guardians.body),
        takeUntil(this.destroy)
      )
      .subscribe((guardians) => {
        this.guardiansUpdating = guardians;
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

  onUpdateClick() {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    if (!this.validGuardians(guardians)) {
      return;
    }

    this.loading = true;
    this.disableSave = true;

    this.guardianService
      .updateChildGuardiansById(this.childId, guardians)
      .subscribe({
        next: (res) => {
          this.popupService.success('Child guardians successfully updated!');
          this.resetStatus();
          this.router.navigate([`/children/${this.childId}/details`]);
        },
        error: () => {
          this.popupService.error(
            'Unable to update child guardians at this time. Try again later.'
          );
          this.resetStatus();
        },
      });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }

  validGuardians(guardians: any[]): boolean {
    if (guardians.length < 1) {
      this.popupService.error(
        'Child is required to have at least one guardian assigned to them.'
      );
      return false;
    }

    if (guardians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected guardians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
