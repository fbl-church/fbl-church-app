import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  exports: [LoginModule, WelcomeModule],
})
export class PagesModule {}
