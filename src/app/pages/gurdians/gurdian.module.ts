import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateGurdianComponent } from './create-gurdian/create-gurdian.component';
import { ClubberGurdiansDetailsGridComponent } from './gurdian-detail/gurdian-clubbers-details-grid/gurdian-clubbers-details-grid.component';
import { GurdianDetailComponent } from './gurdian-detail/gurdian-detail.component';
import { GurdianDetailsCardComponent } from './gurdian-detail/gurdian-details-card/gurdian-details-card.component';
import { DeleteGurdianModalComponent } from './gurdian-detail/modals/delete-gurdian-modal/delete-gurdian-modal.component';
import { GurdianComponent } from './gurdian.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    GurdianComponent,
    GurdianDetailComponent,
    DeleteGurdianModalComponent,
    GurdianDetailsCardComponent,
    ClubberGurdiansDetailsGridComponent,
    CreateGurdianComponent,
  ],
})
export class GurdianModule {}
