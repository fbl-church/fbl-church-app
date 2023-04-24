import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserModalComponent } from './user-detail/modals/delete-user-modal/delete-user-modal.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    UserComponent,
    UserDetailComponent,
    CreateUserComponent,
    DeleteUserModalComponent,
  ],
})
export class UserModule {}
