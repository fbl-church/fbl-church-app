import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, of, takeUntil, tap } from 'rxjs';
import { AttendanceRecordChildrenGridComponent } from 'src/app/shared/components/grids/attendance/attendance-record-children-grid/attendance-record-children-grid.component';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-nursery-attendance-detail',
  templateUrl: './nursery-attendance-detail.component.html',
})
export class NurseryAttendanceDetailComponent implements OnInit, OnDestroy {
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
    private readonly route: ActivatedRoute,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly navigationService: NavigationService
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
    this.navigationService.back('/nursery/check-in');
  }

  onEditClick() {
    this.navigationService.navigate(`/nursery/check-in/${this.record.id}/details/edit`);
  }

  onChildrenCheckInEditClick() {
    this.navigationService.navigate(`/nursery/check-in/${this.record.id}/details/children`);
  }

  refreshChildrenGrid() {
    this.childrenGrid.refresh();
  }

  onCheckInStarted() {
    this.navigationService.navigate(`/nursery/check-in/${this.record.id}/details/children`);
  }
}
