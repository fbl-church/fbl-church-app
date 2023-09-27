import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AttendanceRecord,
  AttendanceStatus,
} from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import {
  Observable,
  Subject,
  iif,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AttendanceRecordChildrenGridComponent } from 'src/app/shared/components/grids/attendance/attendance-record-children-grid/attendance-record-children-grid.component';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { UserService } from 'src/service/users/user.service';

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
  startedByUser: User;
  closedByUser: User;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.record = res.attendanceRecord.body)),
        switchMap(() => this.getUser(this.record.startedByUserId)),
        tap((res) => (this.startedByUser = res)),
        switchMap(() => this.getUser(this.record.closedByUserId)),
        tap((res) => (this.closedByUser = res)),
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
          this.attendanceRecordService.getAttendanceChildrenById(
            this.record.id,
            params.set('present', [true])
          );
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/nursery/check-in']);
  }

  onEditClick() {
    this.router.navigate([`/nursery/check-in/${this.record.id}/details/edit`]);
  }

  onChildrenCheckInEditClick() {
    this.router.navigate([
      `/nursery/check-in/${this.record.id}/details/children`,
    ]);
  }

  getUser(id: any): Observable<User> {
    return iif(
      () => !!id,
      this.userService.getUserById(id).pipe(map((res) => res.body)),
      of(null)
    );
  }

  onRecordClosed(event: AttendanceRecord) {
    this.record.status = AttendanceStatus.CLOSED;
    this.record.closedDate = event.closedDate;
    this.getUser(event.closedByUserId).subscribe(
      (res) => (this.closedByUser = res)
    );
  }

  refreshChildrenGrid() {
    this.childrenGrid.refresh();
  }

  onCheckInStarted() {
    this.router.navigate([
      `/nursery/check-in/${this.record.id}/details/children`,
    ]);
  }
}
