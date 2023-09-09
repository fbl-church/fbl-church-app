import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordsService,
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
