import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateGurdianComponent } from './create-gurdian/create-gurdian.component';
import { ExistingUserGurdianComponent } from './create-gurdian/existing-user-gurdian/existing-user-gurdian.component';
import { UserToGurdianModalComponent } from './create-gurdian/existing-user-gurdian/modals/user-to-gurdian-modal/user-to-gurdian-modal.component';
import { GurdianDetailsCardComponent } from './gurdian-detail/cards/gurdian-details-card/gurdian-details-card.component';
import { GurdianDetailComponent } from './gurdian-detail/gurdian-detail.component';
import { DeleteGurdianModalComponent } from './gurdian-detail/modals/delete-gurdian-modal/delete-gurdian-modal.component';
import { EditGurdianComponent } from './gurdian-detail/pages/edit-gurdian/edit-gurdian.component';
import { GurdianComponent } from './gurdian.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    GurdianComponent,
    GurdianDetailComponent,
    DeleteGurdianModalComponent,
    GurdianDetailsCardComponent,
    CreateGurdianComponent,
    EditGurdianComponent,
    ExistingUserGurdianComponent,
    UserToGurdianModalComponent,
  ],
})
export class GurdianModule {}
