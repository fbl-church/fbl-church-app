import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { Subject, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
})
export class ChildDetailComponent implements OnInit, OnDestroy {
  childData: Child;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.childData = res.child.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
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
