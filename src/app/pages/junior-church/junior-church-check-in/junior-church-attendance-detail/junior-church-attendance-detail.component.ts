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
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, of, takeUntil } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

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

  Feature = Feature;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  canStartCheckIn = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.attendanceRecord.body),
        takeUntil(this.destroy)
      )
      .subscribe((res: AttendanceRecord) => {
        this.workerDataloader = () =>
          of(
            new HttpResponse({
              body: res.workers,
              headers: new HttpHeaders({
                'total-count': `${res.workers.length}`,
              }),
            })
          );
        this.childrenDataloader = (params) =>
          this.attendanceRecordService.getAttendanceChildrenById(
            res.id,
            params.set('present', [true])
          );
        this.record = res;
        this.canStartCheckIn =
          res.activeDate ===
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

  onRecordClosed(event: AttendanceRecord) {
    this.record.status = AttendanceStatus.CLOSED;
    this.record.closedDate = event.closedDate;
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
