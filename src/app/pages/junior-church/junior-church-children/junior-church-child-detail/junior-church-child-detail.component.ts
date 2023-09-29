import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  ChurchGroup,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildAttendanceService } from 'src/service/attendance/child-attendance.service';
@Component({
  selector: 'app-junior-church-child-detail',
  templateUrl: './junior-church-child-detail.component.html',
})
export class JuniorChurchChildDetailComponent implements OnInit, OnDestroy {
  childData: Child;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  destroy = new Subject<void>();
  childRecordDataLoader: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly childAttendanceService: ChildAttendanceService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.childData = res.child.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childRecordDataLoader = (params) =>
          this.getChildAttendanceDataloader(params);
        this.loading = false;
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

  getChildAttendanceDataloader(params?: Map<string, string[]>) {
    return this.childAttendanceService.getChildAttendanceRecordsByChildId(
      this.childData.id,
      params.set('group', [ChurchGroup.JUNIOR_CHURCH])
    );
  }
}
