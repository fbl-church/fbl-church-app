import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';
@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
})
export class ChildDetailComponent implements OnInit {
  childData: Child;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();
  constructor(
    private readonly childrenService: ChildrenService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.childrenService.getById(res.id)),
        tap((res) => (this.childData = res.body)),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load child details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.location.back();
  }

  onChildDetailEditClick() {
    this.router.navigate([`/children/${this.childData.id}/details/edit`]);
  }
}
