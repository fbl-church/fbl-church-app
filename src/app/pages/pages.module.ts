import { NgModule } from '@angular/core';
import { ChildrenModule } from './children/children.module';
import { GurdianModule } from './gurdians/gurdian.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './users/user.module';

@NgModule({
  exports: [
    HomeModule,
    LoginModule,
    UserModule,
    ChildrenModule,
    ProfileModule,
    GurdianModule,
  ],
})
export class PagesModule {}
