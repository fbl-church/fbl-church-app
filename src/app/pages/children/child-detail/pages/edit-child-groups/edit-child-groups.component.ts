import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ChildGroupGridCardComponent } from 'src/app/shared/components/cards/child-group-grid-card/child-group-grid-card.component';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-edit-child-groups',
  templateUrl: './edit-child-groups.component.html',
})
export class EditChildGroupsComponent implements OnInit, OnDestroy {
  @ViewChild(ChildGroupGridCardComponent)
  childGroupsSelectionGrid: ChildGroupGridCardComponent;

  loading = true;
  destroy = new Subject<void>();
  childUpdating: Child;
  childId: number;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly childrenService: ChildrenService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params
      .pipe(
        tap((p) => (this.childId = p.id)),
        switchMap(() => this.route.data),
        map((res) => res.child.body),
        takeUntil(this.destroy)
      )
      .subscribe((child) => {
        this.childUpdating = child;
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
    this.loading = true;
    this.disableSave = true;

    this.childrenService
      .updateChildGroups(
        this.childId,
        this.childGroupsSelectionGrid.getSelectedChurchGroups()
      )
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
