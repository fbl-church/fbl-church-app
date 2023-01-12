import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { WelcomeOverviewComponent } from './welcome-overview/welcome-overview.component';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [WelcomeComponent, WelcomeOverviewComponent],
})
export class WelcomeModule {}
