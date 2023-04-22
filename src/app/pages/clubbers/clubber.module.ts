import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClubberComponent } from './clubber.component';
import { CreateClubberComponent } from './create-clubber/create-clubber.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [ClubberComponent, CreateClubberComponent],
})
export class ClubberModule {}
