import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  WebRole = WebRole;
  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.getAttendanceRecordsDataloader(params);
  }

  getAttendanceRecordsDataloader(params?: Map<string, string[]>) {
    return this.attendanceRecordService.get(params);
  }

  onRowClick(event: AttendanceRecord) {
    this.router.navigate([`/junior-church/check-in/${event.id}/details`]);
  }

  onNewAttendanceRecord() {
    this.router.navigate(['/junior-church/new-record']);
  }
}
