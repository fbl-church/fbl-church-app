import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginNewComponent } from './login-new/login-new.component';
import { LoginOverviewComponent } from './login-overview/login-overview.component';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    LoginComponent,
    LoginOverviewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginNewComponent,
  ],
})
export class LoginModule {}
