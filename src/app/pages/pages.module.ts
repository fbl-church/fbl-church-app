import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './users/user.module';

@NgModule({
  exports: [HomeModule, LoginModule, UserModule, ProfileModule],
})
export class PagesModule {}
