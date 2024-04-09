import { Component } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, ChurchGroup, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  ChurchGroup = ChurchGroup;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params: any) =>
      this.attendanceRecordService.get(params.set('type', [ChurchGroup.JUNIOR_CHURCH]));
  }

  onRowClick(event: AttendanceRecord) {
    this.navigationService.navigate(`/junior-church/check-in/${event.id}/details`);
  }

  onNewAttendanceRecord() {
    this.navigationService.navigate('/junior-church/new-record');
  }
}
