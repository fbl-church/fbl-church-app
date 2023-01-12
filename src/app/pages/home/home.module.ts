import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
