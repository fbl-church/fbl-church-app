import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Subject, map, of, takeUntil } from 'rxjs';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-junior-church-attendance-detail',
  templateUrl: './junior-church-attendance-detail.component.html',
})
export class JuniorChurchAttendanceDetailComponent
  implements OnInit, OnDestroy
{
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
    private readonly attendanceRecordServie: AttendanceRecordsService
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
          this.attendanceRecordServie.getAttendanceChildrenById(res.id, params);
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
}
