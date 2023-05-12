import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClubberAdditionalInfoCardCardComponent } from './clubber-detail/cards/clubber-additional-info-card/clubber-additional-info-card.component';
import { ClubberDetailsCardComponent } from './clubber-detail/cards/clubber-details-card/clubber-details-card.component';
import { ClubberGurdiansDetailsGridComponent } from './clubber-detail/cards/clubber-gurdians-details-grid/clubber-gurdians-details-grid.component';
import { ClubberDetailComponent } from './clubber-detail/clubber-detail.component';
import { DeleteClubberModalComponent } from './clubber-detail/modals/delete-clubber-modal/delete-clubber-modal.component';
import { EditClubberComponent } from './clubber-detail/pages/edit-clubber/edit-clubber.component';
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
    EditClubberComponent,
  ],
})
export class ClubberModule {}
