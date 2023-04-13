import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { CreateAccountComponent } from './create-account/create-accountcomponent';
import { LoginOverviewComponent } from './login-overview/login-overview.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    LoginComponent,
    LoginOverviewComponent,
    CreateAccountComponent,
  ],
})
export class LoginModule {}
