import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AwanaCheckInComponent } from './awana-check-in/awana-check-in.component';
import { AwanaChildrenDetailComponent } from './awana-children/awana-children-detail/awana-children-detail.component';
import { AwanaChildrenComponent } from './awana-children/awana-children.component';
import { AwanaWorkersComponent } from './awana-workers/awana-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [AwanaWorkersComponent, AwanaChildrenComponent, AwanaChildrenDetailComponent, AwanaCheckInComponent],
})
export class AwanaModule {}
