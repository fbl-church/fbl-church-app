import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
