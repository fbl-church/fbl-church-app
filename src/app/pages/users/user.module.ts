import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './user-detail/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './user-detail/pages/reset-password/reset-password.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [UserComponent, UserDetailComponent, CreateUserComponent, ResetPasswordComponent, EditUserComponent],
})
export class UserModule {}
