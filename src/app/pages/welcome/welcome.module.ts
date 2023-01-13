import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { WelcomeInroductionComponent } from './sections/welcome-introduction/welcome-introduction.component';
import { WelcomeNavbarComponent } from './sections/welcome-navbar/welcome-navbar.component';
import { WelcomeOverviewComponent } from './welcome-overview/welcome-overview.component';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    WelcomeComponent,
    WelcomeOverviewComponent,
    WelcomeInroductionComponent,
    WelcomeNavbarComponent,
  ],
})
export class WelcomeModule {}
