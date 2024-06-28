import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModalsModule } from '../modals/shared-modals.module';
import { AttendanceRecordDetailHeaderComponent } from './attendance-record-detail-header/attendance-record-detail-header.component';
import { VBSAttendanceDetailHeaderComponent } from './vbs-attendance-detail-header/vbs-attendance-detail-header.component';

@NgModule({
  imports: [BaseInitModule, SharedModalsModule],
  declarations: [AttendanceRecordDetailHeaderComponent, VBSAttendanceDetailHeaderComponent],
  exports: [AttendanceRecordDetailHeaderComponent, VBSAttendanceDetailHeaderComponent],
})
export class SharedHeadersModule {}
