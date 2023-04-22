import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { ClubberFormComponent } from './components/clubber-form/clubber-form.component';
import { ClubberGurdiansGridCardComponent } from './components/clubber-form/clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
    ClubberFormComponent,
    ClubberGurdiansGridCardComponent,
  ],
  exports: [
    UserFormComponent,
    UserDetailsCardComponent,
    ClubberFormComponent,
    ClubberGurdiansGridCardComponent,
  ],
})
export class SharedModule {}
