import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule],
})
export class HomeModule {}
