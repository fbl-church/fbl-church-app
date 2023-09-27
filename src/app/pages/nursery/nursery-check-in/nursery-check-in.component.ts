import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  ChurchGroup,
  FeatureType,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-nursery-check-in',
  templateUrl: './nursery-check-in.component.html',
})
export class NurseryCheckInComponent {
  dataloader: any;

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.attendanceRecordService.get(
        params.set('type', [ChurchGroup.NURSERY])
      );
  }

  onRowClick(event: AttendanceRecord) {
    this.router.navigate([`/nursery/check-in/${event.id}/details`]);
  }

  onNewAttendanceRecord() {
    this.router.navigate(['/nursery/new-record']);
  }
}
