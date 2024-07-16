import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child-attendance-records-grid',
  templateUrl: './child-attendance-records-grid.component.html',
})
export class ChildAttendanceRecordsGridComponent {
  @ViewChild(GridComponent) grid: GridComponent;
  @Input() dataloader: (params) => Observable<HttpResponse<ChildAttendance[]>>;
  @Input() title = 'Attendance Records';
  @Input() pagerVisible = true;
  @Output() rowClick = new EventEmitter<ChildAttendance>();

  constructor() {}

  onRowClick(event: ChildAttendance) {
    this.rowClick.emit(event);
  }
}
