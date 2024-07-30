import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { MaterialModule } from 'src/app/common/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginOverviewComponent } from './login-overview/login-overview.component';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [BaseInitModule, MaterialModule],
  declarations: [LoginComponent, LoginOverviewComponent, ForgotPasswordComponent, ResetPasswordComponent],
})
export class LoginModule {}
