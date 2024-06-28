import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModalsModule } from '../modals/shared-modals.module';
import { AttendanceRecordFormComponent } from './attendance-record-form/attendance-record-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { GuardianFormComponent } from './guardian-form/guardian-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [BaseInitModule, SharedModalsModule],
  declarations: [UserFormComponent, GuardianFormComponent, ChildFormComponent, AttendanceRecordFormComponent],
  exports: [UserFormComponent, GuardianFormComponent, ChildFormComponent, AttendanceRecordFormComponent],
})
export class SharedFormsModule {}
