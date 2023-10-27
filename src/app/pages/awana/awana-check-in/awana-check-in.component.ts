import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, ChurchGroup, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-awana-check-in',
  templateUrl: './awana-check-in.component.html',
})
export class AwanaCheckInComponent {
  dataloader: any;

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private readonly attendanceRecordService: AttendanceRecordService, private readonly router: Router) {
    this.dataloader = (params: any) =>
      this.attendanceRecordService.get(
        params.set('type', [
          ChurchGroup.TNT_BOYS,
          ChurchGroup.TNT_GIRLS,
          ChurchGroup.CUBBIES,
          ChurchGroup.SPARKS,
          ChurchGroup.CROSS_CHECK,
        ])
      );
  }

  onRowClick(event: AttendanceRecord) {}

  onNewAttendanceRecord() {}
}
