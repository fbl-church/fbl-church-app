import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/shared/modules/base-init.module';
import { AboutOverviewComponent } from './about-overview/about-overview.component';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [AboutComponent, AboutOverviewComponent],
})
export class AboutModule {}
