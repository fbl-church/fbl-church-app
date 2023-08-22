import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
})
export class EditChildComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  childId: number;
  childUpdating: Child;
  disableSave = false;

  constructor(
    private readonly location: Location,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly childrenService: ChildrenService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.user.body),
        tap((res) => (this.childId = res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((user) => {
        this.childUpdating = user;
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

  onSaveClick(child: Child) {
    this.loading = true;
    this.childrenService.update(this.childId, child).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('Child Successfully updated!');
        this.loading = false;
      },
      error: () => {
        this.popupService.error('Child could not be updated at this time!');
        this.loading = false;
      },
    });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }
}
