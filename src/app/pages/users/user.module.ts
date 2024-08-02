import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './user-detail/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './user-detail/pages/reset-password/reset-password.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
@NgModule({
  imports: [BaseInitModule, SharedModule, MatSlideToggleModule, MatIconModule, MatBadgeModule, MatChipsModule],
  declarations: [UserComponent, UserDetailComponent, CreateUserComponent, ResetPasswordComponent, EditUserComponent],
})
export class UserModule {}
