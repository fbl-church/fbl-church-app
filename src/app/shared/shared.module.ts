import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [AuthenticatedLayoutComponent, UserFormComponent],
  exports: [UserFormComponent],
})
export class SharedModule {}
