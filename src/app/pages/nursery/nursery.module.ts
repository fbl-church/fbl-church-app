import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NurseryCheckInChildModalComponent } from './nursery-check-in/nursery-attendance-detail/modals/check-in-child-modal/check-in-child-modal.component';
import { NurseryAttendanceDetailComponent } from './nursery-check-in/nursery-attendance-detail/nursery-attendance-detail.component';
import { EditNurseryRecordComponent } from './nursery-check-in/nursery-attendance-detail/pages/edit-nursery-attendance-record/edit-nursery-attendance-record.component';
import { NurseryChildrenCheckInComponent } from './nursery-check-in/nursery-attendance-detail/pages/nursery-children-check-in/nursery-children-check-in.component';
import { NurseryCheckInComponent } from './nursery-check-in/nursery-check-in.component';
import { NurseryNewAttendanceRecordComponent } from './nursery-check-in/nursery-new-attendance-record/nursery-new-attendance-record.component';
import { NurseryChildDetailComponent } from './nursery-children/nursery-child-detail/nursery-child-detail.component';
import { NurseryChildrenComponent } from './nursery-children/nursery-children.component';
import { NurseryWorkersComponent } from './nursery-workers/nursery-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    NurseryWorkersComponent,
    NurseryChildrenComponent,
    NurseryCheckInComponent,
    NurseryNewAttendanceRecordComponent,
    NurseryAttendanceDetailComponent,
    NurseryChildrenCheckInComponent,
    EditNurseryRecordComponent,
    NurseryCheckInChildModalComponent,
    NurseryChildDetailComponent,
  ],
})
export class NurseryModule {}
