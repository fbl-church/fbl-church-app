import { Component, ViewChild } from '@angular/core';
import { MultiSelectInputComponent } from 'projects/insite-kit/src/component/multiselect/multi-select-input.component';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-new-nursery-new-attendance-record',
  templateUrl: './nursery-new-attendance-record.component.html',
})
export class NurseryNewAttendanceRecordComponent {
  @ViewChild(MultiSelectInputComponent)
  workerSelection: MultiSelectInputComponent;
  destroy = new Subject<void>();
  workers: any[];

  ChurchGroup = ChurchGroup;
  loading = false;

  constructor(
    private readonly attendanceService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService
  ) {}

  onBackClick() {
    this.navigationService.back('/nursery/check-in');
  }

  onCancelClick() {
    this.onBackClick();
  }

  onSaveClick(newRecord: AttendanceRecord) {
    this.loading = true;

    this.attendanceService.create(newRecord).subscribe({
      next: (res) => {
        this.navigationService.navigate(`/nursery/check-in/${res.id}/details`, false);
        this.popupService.success('Nursery Attendance Record Successfully Created!');
      },
      error: () => {
        this.popupService.error('Unable to create Nursery Attendance Record. Try again later.');
        this.loading = false;
      },
    });
  }
}
