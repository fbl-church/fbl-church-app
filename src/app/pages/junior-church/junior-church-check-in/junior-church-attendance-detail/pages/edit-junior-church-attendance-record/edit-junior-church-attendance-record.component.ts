import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-edit-junior-church-attendance-record',
  templateUrl: './edit-junior-church-attendance-record.component.html',
})
export class EditJuniorChurchRecordComponent implements OnInit, OnDestroy {
  record: AttendanceRecord;
  destroy = new Subject<void>();
  loading = true;

  constructor(
    private readonly attendanceService: AttendanceRecordsService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.attendanceRecord.body),
        takeUntil(this.destroy)
      )
      .subscribe((rec) => {
        this.record = rec;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onCancelClick() {
    this.onBackClick();
  }

  onUpdateClick(newRecord: AttendanceRecord) {
    this.loading = true;

    this.attendanceService.update(this.record.id, newRecord).subscribe({
      next: (res) => {
        this.popupService.success(
          'Junior Church Attendance Record Successfully Updated!'
        );
        this.router.navigate([`/junior-church/check-in/${res.id}/details`]);
      },
      error: () => {
        this.popupService.error(
          'Unable to update Junior Church Attendance Record. Try again later.'
        );
        this.router.navigate([
          `/junior-church/check-in/${this.record.id}/details`,
        ]);
      },
    });
  }
}
