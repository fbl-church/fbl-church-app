import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AwanaAttendanceDetailComponent } from './awana-check-in/awana-attendance-detail/awana-attendance-detail.component';
import { AwanaCheckInComponent } from './awana-check-in/awana-check-in.component';
import { AwanaNewAttendanceRecordComponent } from './awana-check-in/awana-new-attendance-record/awana-new-attendance-record.component';
import { AwanaChildrenDetailComponent } from './awana-children/awana-children-detail/awana-children-detail.component';
import { AwanaChildrenComponent } from './awana-children/awana-children.component';
import { AwanaWorkersComponent } from './awana-workers/awana-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    AwanaWorkersComponent,
    AwanaChildrenComponent,
    AwanaChildrenDetailComponent,
    AwanaCheckInComponent,
    AwanaNewAttendanceRecordComponent,
    AwanaAttendanceDetailComponent,
  ],
})
export class AwanaModule {}
