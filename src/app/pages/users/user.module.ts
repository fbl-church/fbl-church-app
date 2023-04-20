import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [UserComponent, UserDetailComponent, CreateUserComponent],
})
export class UserModule {}
