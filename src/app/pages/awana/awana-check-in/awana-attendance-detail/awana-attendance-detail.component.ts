import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Subject, of, takeUntil, tap } from 'rxjs';
import { AttendanceRecordChildrenGridComponent } from 'src/app/shared/components/grids/attendance/attendance-record-children-grid/attendance-record-children-grid.component';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-awana-attendance-detail',
  templateUrl: './awana-attendance-detail.component.html',
})
export class AwanaAttendanceDetailComponent implements OnInit, OnDestroy {
  @ViewChild(AttendanceRecordChildrenGridComponent)
  childrenGrid: AttendanceRecordChildrenGridComponent;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  loading = true;
  destroy = new Subject<void>();

  record: AttendanceRecord;
  workerDataloader: any;
  childrenDataloader: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly attendanceRecordService: AttendanceRecordService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.record = res.attendanceRecord.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.workerDataloader = () =>
          of(
            new HttpResponse({
              body: this.record.workers,
              headers: new HttpHeaders({
                'total-count': `${this.record.workers.length}`,
              }),
            })
          );
        this.childrenDataloader = (params) =>
          this.attendanceRecordService.getAttendanceChildrenById(this.record.id, params.set('present', [true]));
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/awana/check-in']);
  }

  onEditClick() {
    this.router.navigate([`/awana/check-in/${this.record.id}/details/edit`]);
  }

  onChildrenCheckInEditClick() {
    this.router.navigate([`/awana/check-in/${this.record.id}/details/children`]);
  }

  refreshChildrenGrid() {
    this.childrenGrid.refresh();
  }

  onCheckInStarted() {
    this.router.navigate([`/awana/check-in/${this.record.id}/details/children`]);
  }
}
