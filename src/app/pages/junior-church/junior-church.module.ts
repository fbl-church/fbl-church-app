import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchAttendanceDetailComponent } from './junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { CheckInChildModalComponent } from './junior-church-check-in/junior-church-attendance-detail/modals/check-in-child-modal/check-in-child-modal.component';
import { EditJuniorChurchRecordComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-attendance-record/edit-junior-church-attendance-record.component';
import { JuniorChurchChildrenCheckInComponent } from './junior-church-check-in/junior-church-attendance-detail/pages/junior-church-children-check-in/junior-church-children-check-in.component';
import { JuniorChurchCheckInComponent } from './junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from './junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchChildDetailComponent } from './junior-church-children/junior-church-child-detail/junior-church-child-detail.component';
import { JuniorChurchChildrenComponent } from './junior-church-children/junior-church-children.component';
import { JuniorChurchLessonsComponent } from './junior-church-lessons/junior-church-lessons.component';
import { LessonsUploadComponent } from './junior-church-lessons/lessons-upload/lessons-upload.component';
import { DeleteFileModalComponent } from './junior-church-lessons/modals/delete-file-modal/delete-file-modal.component';
import { FileDetailsModalComponent } from './junior-church-lessons/modals/file-details-modal/file-details-modal.component';
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
    JuniorChurchChildDetailComponent,
    JuniorChurchLessonsComponent,
    LessonsUploadComponent,
    DeleteFileModalComponent,
    FileDetailsModalComponent,
  ],
})
export class JuniorChurchModule {}
