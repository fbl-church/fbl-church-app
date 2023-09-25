import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-record-workers-grid',
  templateUrl: './attendance-record-workers-grid.component.html',
})
export class AttendanceRecordWorkersGridComponent {
  @Input() dataloader: (params) => Observable<HttpResponse<User[]>>;
  @Output() rowClick = new EventEmitter<User>();

  constructor() {}

  onRowClick(event: User) {
    this.rowClick.emit(event);
  }
}
