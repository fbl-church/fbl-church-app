import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/shared/modules/base-init.module';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeComponent } from './home.component';
import { HomeInroductionComponent } from './sections/home-introduction/home-introduction.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    HomeComponent,
    HomeOverviewComponent,
    HomeInroductionComponent,
  ],
})
export class HomeModule {}
