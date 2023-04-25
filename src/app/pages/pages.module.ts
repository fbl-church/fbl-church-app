import { NgModule } from '@angular/core';
import { ClubberModule } from './clubbers/clubber.module';
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
    ClubberModule,
    ProfileModule,
    GurdianModule,
  ],
})
export class PagesModule {}
