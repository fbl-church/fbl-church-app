import { Component, ViewChild } from '@angular/core';
import { MultiSelectInputComponent } from 'projects/insite-kit/src/component/multiselect/multi-select-input.component';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-awana-new-attendance-record',
  templateUrl: './awana-new-attendance-record.component.html',
})
export class AwanaNewAttendanceRecordComponent {
  @ViewChild(MultiSelectInputComponent)
  workerSelection: MultiSelectInputComponent;

  ChurchGroup = ChurchGroup;
  loading = false;

  constructor(
    private readonly attendanceService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService
  ) {}

  onBackClick() {
    this.navigationService.back('/awana/check-in');
  }

  onCancelClick() {
    this.onBackClick();
  }

  onSaveClick(newRecord: AttendanceRecord) {
    this.loading = true;

    this.attendanceService.create(newRecord).subscribe({
      next: (res) => {
        this.popupService.success('Awana Attendance Record Successfully Created!');
        this.navigationService.navigate(`/awana/check-in/${res.id}/details`);
      },
      error: () => {
        this.popupService.error('Unable to create Awana Attendance Record. Try again later.');
        this.loading = false;
      },
    });
  }
}
