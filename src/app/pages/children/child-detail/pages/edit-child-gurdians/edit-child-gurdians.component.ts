import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/child.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ChildGurdiansGridCardComponent } from 'src/app/shared/components/cards/child-gurdians-grid-card/child-gurdians-grid-card.component';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-edit-child-gurdians',
  templateUrl: './edit-child-gurdians.component.html',
})
export class EditChildGurdiansComponent implements OnInit, OnDestroy {
  @ViewChild(ChildGurdiansGridCardComponent)
  gurdianSelectionGrid: ChildGurdiansGridCardComponent;

  loading = true;
  destroy = new Subject<void>();
  gurdiansUpdating: Gurdian[];
  childId: number;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gurdianService: GurdianService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params
      .pipe(
        tap((p) => (this.childId = p.id)),
        switchMap((res) => this.route.data),
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

  onUpdateClick() {
    const gurdians = this.gurdianSelectionGrid.getSelectedGurdians();
    if (!this.validGurdians(gurdians)) {
      return;
    }

    this.loading = true;
    this.disableSave = true;

    this.gurdianService
      .updateChildGurdiansById(this.childId, gurdians)
      .subscribe({
        next: (res) => {
          this.popupService.success('Child gurdians successfully updated!');
          this.resetStatus();
          this.router.navigate([`/children/${this.childId}/details`]);
        },
        error: () => {
          this.popupService.error(
            'Unable to update child gurdians at this time. Try again later.'
          );
          this.resetStatus();
        },
      });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }

  validGurdians(gurdians: any[]): boolean {
    if (gurdians.length < 1) {
      this.popupService.error(
        'Child is required to have at least one gurdian assigned to them.'
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
