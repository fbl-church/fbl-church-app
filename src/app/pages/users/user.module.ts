import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [UserComponent],
})
export class UserModule {}
