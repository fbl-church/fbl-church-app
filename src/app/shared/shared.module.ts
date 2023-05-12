import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ClubberGurdiansGridCardComponent } from './components/cards/clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';
import { UserDetailsCardComponent } from './components/cards/user-details-card/user-details-card.component';
import { ClubberFormComponent } from './components/forms/clubber-form/clubber-form.component';
import { GurdianFormComponent } from './components/forms/gurdian-form/gurdian-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
    ClubberFormComponent,
    ClubberGurdiansGridCardComponent,
    GurdianFormComponent,
  ],
  exports: [
    UserFormComponent,
    UserDetailsCardComponent,
    ClubberFormComponent,
    GurdianFormComponent,
    ClubberGurdiansGridCardComponent,
  ],
})
export class SharedModule {}
