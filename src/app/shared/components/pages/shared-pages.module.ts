import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedCardsModule } from '../cards/shared-cards.module';
import { SharedGridsModule } from '../grids/shared-grids.module';
import { SharedHeadersModule } from '../headers/shared-headers.module';
import { SharedModalsModule } from '../modals/shared-modals.module';
import { VBSAttendanceDetailEditComponent } from './vbs/vbs-attendance-detail-edit/vbs-attendance-detail-edit.component';
import { VBSAttendanceChildrenCheckInComponent } from './vbs/vbs-attendance-detail/vbs-attendance-children-check-in/vbs-attendance-children-check-in.component';
import { VBSAttendanceChildrenPointsComponent } from './vbs/vbs-attendance-detail/vbs-attendance-children-points/vbs-attendance-children-points.component';
import { VBSAttendanceDetailComponent } from './vbs/vbs-attendance-detail/vbs-attendance-detail.component';

@NgModule({
  imports: [BaseInitModule, SharedModalsModule, SharedHeadersModule, SharedCardsModule, SharedGridsModule],
  declarations: [
    VBSAttendanceDetailComponent,
    VBSAttendanceDetailEditComponent,
    VBSAttendanceChildrenCheckInComponent,
    VBSAttendanceChildrenPointsComponent,
  ],
  exports: [
    VBSAttendanceDetailComponent,
    VBSAttendanceDetailEditComponent,
    VBSAttendanceChildrenCheckInComponent,
    VBSAttendanceChildrenPointsComponent,
  ],
})
export class SharedPagesModule {}
