import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccessManagerApplicationsComponent } from './access-manager-applications/access-manager-applications.component';
import { ApplicationDetailComponent } from './access-manager-applications/application-detail/application-detail.component';
import { AccessManagerComponent } from './access-manager.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    AccessManagerComponent,
    AccessManagerApplicationsComponent,
    ApplicationDetailComponent,
  ],
})
export class AccessManagerModule {}
