import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import {
  AttendanceRecord,
  AttendanceStatus,
} from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  FeatureType,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
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
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-junior-church-attendance-detail',
  templateUrl: './junior-church-attendance-detail.component.html',
})
export class JuniorChurchAttendanceDetailComponent
  implements OnInit, OnDestroy
{
  @ViewChild('childrenGrid') childrenGrid: GridComponent;

  loading = true;
  destroy = new Subject<void>();
  record: AttendanceRecord;
  workerDataloader: any;
  childrenDataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  startedByUser: User;
  closedByUser: User;

  canStartCheckIn = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.attendanceRecord.body),
        tap((res) => (this.record = res)),
        switchMap(() =>
          iif(
            () => !!this.record.startedByUserId,
            this.getUser(this.record.startedByUserId),
            of({})
          )
        ),
        tap((res) => (this.startedByUser = res)),
        switchMap(() =>
          iif(
            () => !!this.record.closedByUserId,
            this.getUser(this.record.closedByUserId),
            of(null)
          )
        ),
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

        this.canStartCheckIn =
          this.record.activeDate ===
          this.commonService.formatDate(new Date(), 'yyyy-MM-dd');
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onEditClick() {
    this.router.navigate([
      `/junior-church/check-in/${this.record.id}/details/edit`,
    ]);
  }

  onChildrenCheckInEditClick() {
    this.router.navigate([
      `/junior-church/check-in/${this.record.id}/details/children`,
    ]);
  }

  getUser(id: number): Observable<User> {
    return this.userService.getUserById(id).pipe(map((res) => res.body));
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

  onStartCheckIn() {
    this.loading = true;
    this.attendanceRecordService
      .updateStatus(this.record.id, AttendanceStatus.ACTIVE)
      .subscribe({
        next: (res) => {
          this.popupService.success(
            'Attendance Record Successfully Activated! Start Check in!'
          );
          this.router.navigate([
            `/junior-church/check-in/${this.record.id}/details/children`,
          ]);
        },
        error: () => {
          this.popupService.error('Unable to Start Check in. Try again later.');
          this.loading = false;
        },
      });
  }
}
