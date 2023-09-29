import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child-attendance-records-grid',
  templateUrl: './child-attendance-records-grid.component.html',
})
export class ChildAttendanceRecordsGridComponent {
  @Input() dataloader: (params) => Observable<HttpResponse<ChildAttendance[]>>;
  @Output() rowClick = new EventEmitter<ChildAttendance>();

  constructor() {}

  onRowClick(event: ChildAttendance) {
    this.rowClick.emit(event);
  }
}
