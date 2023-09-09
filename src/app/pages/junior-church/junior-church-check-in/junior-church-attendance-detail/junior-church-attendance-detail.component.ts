import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { Subject, map, of, takeUntil } from 'rxjs';

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

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((res) => res.attendanceRecord.body),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.workerDataloader = () =>
          of(
            new HttpResponse({
              body: res.workers,
              headers: new HttpHeaders({
                'total-count': `${res.workers.length}`,
              }),
            })
          );
        this.record = res;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/junior-church/check-in']);
  }
}
