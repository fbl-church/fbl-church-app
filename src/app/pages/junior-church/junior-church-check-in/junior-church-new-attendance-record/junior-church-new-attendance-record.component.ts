import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MultiSelectInputComponent } from 'projects/insite-kit/src/component/multiselect/multi-select-input.component';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-new-junior-church-new-attendance-record',
  templateUrl: './junior-church-new-attendance-record.component.html',
})
export class JuniorChurchNewAttendanceRecordComponent {
  @ViewChild(MultiSelectInputComponent)
  workerSelection: MultiSelectInputComponent;

  ChurchGroup = ChurchGroup;
  loading = false;

  constructor(
    private readonly attendanceService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  onBackClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onCancelClick() {
    this.onBackClick();
  }

  onSaveClick(newRecord: AttendanceRecord) {
    this.loading = true;

    this.attendanceService.create(newRecord).subscribe({
      next: (res) => {
        this.popupService.success('Junior Church Attendance Record Successfully Created!');
        this.router.navigate([`/junior-church/check-in/${res.id}/details`]);
      },
      error: () => {
        this.popupService.error('Unable to create Junior Church Attendance Record. Try again later.');
        this.loading = false;
      },
    });
  }
}
