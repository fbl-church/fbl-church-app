import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ChildGurdiansGridCardComponent } from './components/cards/child-gurdians-grid-card/child-gurdians-grid-card.component';
import { UserDetailsCardComponent } from './components/cards/user-details-card/user-details-card.component';
import { UserRoleSelectionGridComponent } from './components/cards/user-role-selection-grid/user-role-selection-grid.component';
import { UserRolesCardComponent } from './components/cards/user-roles-card/user-roles-card.component';
import { ChildFormComponent } from './components/forms/child-form/child-form.component';
import { GurdianFormComponent } from './components/forms/gurdian-form/gurdian-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    ChildGurdiansGridCardComponent,
    GurdianFormComponent,
    UserRolesCardComponent,
    UserRoleSelectionGridComponent,
  ],
  exports: [
    UserFormComponent,
    UserDetailsCardComponent,
    ChildFormComponent,
    GurdianFormComponent,
    ChildGurdiansGridCardComponent,
    UserRolesCardComponent,
    UserRoleSelectionGridComponent,
  ],
})
export class SharedModule {}
