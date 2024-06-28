import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AttendanceRecordChildrenGridComponent } from './attendance/attendance-record-children-grid/attendance-record-children-grid.component';
import { AttendanceRecordGridComponent } from './attendance/attendance-record-grid/attendance-record-grid.component';
import { AttendanceRecordWorkersGridComponent } from './attendance/attendance-record-workers-grid/attendance-record-workers-grid.component';
import { ChildAttendanceRecordsGridComponent } from './attendance/child-attendance-records-grid/child-attendance-records-grid.component';
import { ChildGroupDetailsGridComponent } from './children/child-group-details-grid/child-group-details-grid.component';
import { ChildGroupGridCardComponent } from './children/child-group-grid-card/child-group-grid-card.component';
import { ChildGuardiansDetailsGridComponent } from './children/child-guardians-details-grid/child-guardians-details-grid.component';
import { GuardianChildrenDetailsGridComponent } from './guardians/guardian-children-details-grid/guardian-children-details-grid.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AttendanceRecordChildrenGridComponent,
    AttendanceRecordGridComponent,
    AttendanceRecordWorkersGridComponent,
    ChildAttendanceRecordsGridComponent,
    ChildGroupDetailsGridComponent,
    ChildGroupGridCardComponent,
    ChildGuardiansDetailsGridComponent,
    GuardianChildrenDetailsGridComponent,
  ],
  exports: [
    AttendanceRecordChildrenGridComponent,
    AttendanceRecordGridComponent,
    AttendanceRecordWorkersGridComponent,
    ChildAttendanceRecordsGridComponent,
    ChildGroupDetailsGridComponent,
    ChildGroupGridCardComponent,
    ChildGuardiansDetailsGridComponent,
    GuardianChildrenDetailsGridComponent,
  ],
})
export class SharedGridsModule {}
