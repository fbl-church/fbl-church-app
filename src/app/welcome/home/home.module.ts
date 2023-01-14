import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [HomeComponent, HomeOverviewComponent],
})
export class HomeModule {}
