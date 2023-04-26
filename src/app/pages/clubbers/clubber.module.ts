import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClubberAdditionalInfoCardCardComponent } from './clubber-detail/clubber-additional-info-card/clubber-additional-info-card.component';
import { ClubberDetailComponent } from './clubber-detail/clubber-detail.component';
import { ClubberDetailsCardComponent } from './clubber-detail/clubber-details-card/clubber-details-card.component';
import { ClubberGurdiansDetailsGridComponent } from './clubber-detail/clubber-gurdians-details-grid/clubber-gurdians-details-grid.component';
import { DeleteClubberModalComponent } from './clubber-detail/modals/delete-clubber-modal/delete-clubber-modal.component';
import { ClubberComponent } from './clubber.component';
import { CreateClubberComponent } from './create-clubber/create-clubber.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    ClubberComponent,
    CreateClubberComponent,
    ClubberDetailComponent,
    ClubberDetailsCardComponent,
    ClubberGurdiansDetailsGridComponent,
    DeleteClubberModalComponent,
    ClubberAdditionalInfoCardCardComponent,
  ],
})
export class ClubberModule {}
