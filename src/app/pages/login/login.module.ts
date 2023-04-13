import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAccountComponent } from './create-account/create-accountcomponent';
import { LoginOverviewComponent } from './login-overview/login-overview.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LoginComponent,
    LoginOverviewComponent,
    CreateAccountComponent,
  ],
})
export class LoginModule {}
