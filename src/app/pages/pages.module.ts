import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@NgModule({
  exports: [HomeModule, LoginModule],
})
export class PagesModule {}
