import { NgModule } from '@angular/core';
import { ChildrenModule } from './children/children.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GurdianModule } from './gurdians/gurdian.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './users/user.module';
import { VBSModule } from './vbs/vbs.module';

@NgModule({
  exports: [
    DashboardModule,
    LoginModule,
    UserModule,
    ChildrenModule,
    ProfileModule,
    GurdianModule,
    VBSModule,
  ],
})
export class PagesModule {}
