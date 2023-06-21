import { NgModule } from '@angular/core';
import { CheckInModule } from './check-in/check-in.module';
import { ChildrenModule } from './children/children.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GurdianModule } from './gurdians/gurdian.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './users/user.module';

@NgModule({
  exports: [
    DashboardModule,
    LoginModule,
    UserModule,
    ChildrenModule,
    ProfileModule,
    GurdianModule,
    CheckInModule,
  ],
})
export class PagesModule {}
