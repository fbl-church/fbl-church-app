import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchAttendanceDetailComponent } from './junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { CheckInChildModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/check-in-child-modal/check-in-child-modal.component';
import { UpdateChildAttendanceModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/update-child-attendance-modal/update-child-attendance-modal.component';
import { EditJuniorChurchRecordComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-attendance-record/edit-junior-church-attendance-record.component';
import { JuniorChurchChildrenCheckInComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/junior-church-children-check-in/junior-church-children-check-in.component';
import { JuniorChurchCheckInComponent } from './junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from './junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchChildrenComponent } from './junior-church-children/junior-church-children.component';
import { JuniorChurchWorkersComponent } from './junior-church-workers/junior-church-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    JuniorChurchWorkersComponent,
    JuniorChurchCheckInComponent,
    JuniorChurchNewAttendanceRecordComponent,
    JuniorChurchAttendanceDetailComponent,
    EditJuniorChurchRecordComponent,
    JuniorChurchChildrenComponent,
    JuniorChurchChildrenCheckInComponent,
    CheckInChildModalComponent,
    UpdateChildAttendanceModalComponent,
  ],
})
export class JuniorChurchModule {}
