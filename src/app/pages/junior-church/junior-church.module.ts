import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuniorChurchRegistrationComponent } from './junior-church-registration.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [JuniorChurchRegistrationComponent],
})
export class JuniorChurchModule {}
