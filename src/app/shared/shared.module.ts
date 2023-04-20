import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
  ],
  exports: [UserFormComponent, UserDetailsCardComponent],
})
export class SharedModule {}
