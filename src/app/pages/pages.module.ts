import { NgModule } from '@angular/core';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  exports: [LoginModule, WelcomeModule, AboutModule],
})
export class PagesModule {}
