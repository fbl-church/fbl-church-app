import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  exports: [HomeModule, LoginModule, WelcomeModule],
})
export class PagesModule {}
