import { Component, Input } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-attendance-record-details-card',
  templateUrl: './attendance-record-details-card.component.html',
})
export class AttendanceRecordDetailsCardComponent {
  @Input() record: AttendanceRecord;
  @Input() startedByUser: User;
  @Input() closedByUser: User;

  WebRole = WebRole;
}
