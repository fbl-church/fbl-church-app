import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccessManagerComponent } from './access-manager.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [AccessManagerComponent],
})
export class AccessManagerModule {}
