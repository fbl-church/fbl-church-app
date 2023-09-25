import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-record-grid',
  templateUrl: './attendance-record-grid.component.html',
})
export class AttendanceRecordGridComponent {
  @Input() dataloader: (params) => Observable<HttpResponse<AttendanceRecord[]>>;
  @Output() rowClick = new EventEmitter<AttendanceRecord>();

  constructor() {}

  onRowClick(event: AttendanceRecord) {
    this.rowClick.emit(event);
  }
}
