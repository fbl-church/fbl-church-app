import { Component } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, ChurchGroup, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params: any) =>
      this.attendanceRecordService.get(
        params.set('type', [
          ChurchGroup.AWANA,
          ChurchGroup.TNT_BOYS,
          ChurchGroup.TNT_GIRLS,
          ChurchGroup.CUBBIES,
          ChurchGroup.SPARKS,
          ChurchGroup.CROSS_CHECK,
        ])
      );
  }

  onRowClick(event: AttendanceRecord) {
    this.navigationService.navigate(`/awana/check-in/${event.id}/details`);
  }

  onNewAttendanceRecord() {
    this.navigationService.navigate('/awana/check-in/new');
  }
}
