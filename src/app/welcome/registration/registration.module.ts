import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { RegistrationOverviewComponent } from './registration-overview/registration-overview.component';
import { RegistrationComponent } from './registration.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [RegistrationComponent, RegistrationOverviewComponent],
})
export class RegistrationModule {}
