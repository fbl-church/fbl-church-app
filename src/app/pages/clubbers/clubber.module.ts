import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ClubberComponent } from './clubber.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [ClubberComponent],
})
export class ClubberModule {}
