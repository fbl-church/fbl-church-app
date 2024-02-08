import { NgModule } from '@angular/core';
import { AccessManagerModule } from './access-manager/access-manager.module';
import { AwanaModule } from './awana/awana.module';
import { ChildrenModule } from './children/children.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GuardianModule } from './guardians/guardian.module';
import { JuniorChurchModule } from './junior-church/junior-church.module';
import { LoginModule } from './login/login.module';
import { NurseryModule } from './nursery/nursery.module';
import { ProfileModule } from './profile/profile.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './users/user.module';
import { VBSModule } from './vbs/vbs.module';

@NgModule({
  exports: [
    DashboardModule,
    LoginModule,
    UserModule,
    ChildrenModule,
    ProfileModule,
    GuardianModule,
    VBSModule,
    JuniorChurchModule,
    AccessManagerModule,
    NurseryModule,
    AwanaModule,
    ScheduleModule,
  ],
})
export class PagesModule {}
