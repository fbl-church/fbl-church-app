import { HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-record-children-grid',
  templateUrl: './attendance-record-children-grid.component.html',
})
export class AttendanceRecordChildrenGridComponent {
  @ViewChild(GridComponent) grid: GridComponent;
  @Input() dataLoader: (params) => Observable<HttpResponse<Child[]>>;
  @Output() rowClick = new EventEmitter<Child>();

  constructor() {}

  onRowClick(event: Child) {
    this.rowClick.emit(event);
  }

  refresh() {
    this.grid.refresh();
  }
}
