import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { UserDetailsCardComponent } from './components/cards/user-details-card/user-details-card.component';
import { ClubberFormComponent } from './components/forms/clubber-form/clubber-form.component';
import { ClubberGurdiansGridCardComponent } from './components/forms/clubber-form/clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';
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
  ],
})
export class SharedModule {}
