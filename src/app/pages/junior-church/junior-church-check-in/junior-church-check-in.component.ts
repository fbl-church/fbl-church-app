import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  addCirlce = faCirclePlus;

  constructor(
    private attendanceRecordService: AttendanceRecordsService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.getAttendanceRecordsDataloader(params);
  }

  getAttendanceRecordsDataloader(params?: Map<string, string[]>) {
    return this.attendanceRecordService.get(params);
  }

  onNewAttendanceRecord() {
    this.router.navigate(['/junior-church/new-record']);
  }
}
