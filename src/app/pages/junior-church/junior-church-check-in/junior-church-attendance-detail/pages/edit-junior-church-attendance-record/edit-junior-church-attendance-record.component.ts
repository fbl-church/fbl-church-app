import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceRecord, AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-edit-junior-church-attendance-record',
  templateUrl: './edit-junior-church-attendance-record.component.html',
})
export class EditJuniorChurchRecordComponent implements OnInit, OnDestroy {
  record: AttendanceRecord;
  destroy = new Subject<void>();
  loading = true;

  constructor(
    private readonly attendanceService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService
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
          this.navigationService.navigate(`/junior-church/check-in/${rec.id}/details`);
        }
        this.record = rec;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back(`/junior-church/check-in/${this.record.id}/details`);
  }

  onUpdateClick(newRecord: AttendanceRecord) {
    this.loading = true;
    newRecord.type = ChurchGroup.JUNIOR_CHURCH;

    this.attendanceService.update(this.record.id, newRecord).subscribe({
      next: () => {
        this.onBackClick();
        this.popupService.success('Junior Church Attendance Record Successfully Updated!');
      },
      error: () => {
        this.popupService.error('Unable to update Junior Church Attendance Record. Try again later.');
        this.loading = false;
      },
    });
  }
}
