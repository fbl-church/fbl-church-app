import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VBSRegistrationComponent } from './vbs-registration.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [VBSRegistrationComponent],
})
export class VBSModule {}
