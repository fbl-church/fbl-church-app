import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  addCirlce = faCirclePlus;
  fakeData = [
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
    'testData',
  ];

  constructor(
    private attendanceRecordService: AttendanceRecordsService,
    private childrenService: ChildrenService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.getAttendanceRecordsDataloader(params);
  }

  getAttendanceRecordsDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(params.set('size', ['100']));
  }

  onRowClick(event: AttendanceRecord) {
    this.router.navigate([`/junior-church/check-in/${event.id}/details`]);
  }

  onNewAttendanceRecord() {
    this.router.navigate(['/junior-church/new-record']);
  }
}
