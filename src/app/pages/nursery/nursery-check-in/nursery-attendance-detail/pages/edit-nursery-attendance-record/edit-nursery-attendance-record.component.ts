import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceRecord, AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-edit-nursery-attendance-record',
  templateUrl: './edit-nursery-attendance-record.component.html',
})
export class EditNurseryRecordComponent implements OnInit, OnDestroy {
  record: AttendanceRecord;
  destroy = new Subject<void>();
  loading = true;

  constructor(
    private readonly attendanceService: AttendanceRecordService,
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
        if (rec.status === AttendanceStatus.CLOSED) {
          this.popupService.error('Attendance Record is Closed. Cannot update Information!');
          this.router.navigate([`/nursery/check-in/${rec.id}/details`]);
        }
        this.record = rec;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate([`/nursery/check-in/${this.record.id}/details`]);
  }

  onCancelClick() {
    this.onBackClick();
  }

  onUpdateClick(newRecord: AttendanceRecord) {
    this.loading = true;
    newRecord.type = ChurchGroup.NURSERY;

    this.attendanceService.update(this.record.id, newRecord).subscribe({
      next: (res) => {
        this.popupService.success('Nursery Attendance Record Successfully Updated!');
        this.router.navigate([`/nursery/check-in/${res.id}/details`]);
      },
      error: () => {
        this.popupService.error('Unable to update Nursery Attendance Record. Try again later.');
        this.router.navigate([`/nursery/check-in/${this.record.id}/details`]);
      },
    });
  }
}
