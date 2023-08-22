import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Subject, map, takeUntil } from 'rxjs';

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
