import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AwanaCheckInComponent } from './awana/awana-check-in.component';
import { CheckInComponent } from './check-in.component';
import { JuniorChurchCheckInComponent } from './junior-church/junior-church-check-in.component';
import { NurseryCheckInComponent } from './nursery/nursery-check-in.component';
import { VBSCheckInComponent } from './vbs/vbs-check-in.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    CheckInComponent,
    AwanaCheckInComponent,
    JuniorChurchCheckInComponent,
    NurseryCheckInComponent,
    VBSCheckInComponent,
  ],
})
export class CheckInModule {}
