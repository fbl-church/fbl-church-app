import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHILDREN_ROUTE } from './shared/routes/children.route';
import { DASHBOARD_ROUTE } from './shared/routes/dashboard.route';
import { GURDIANS_ROUTE } from './shared/routes/gurdians.route';
import { JUNIOR_CHURCH_ROUTE } from './shared/routes/junior-church.route';
import { PROFILE_ROUTE } from './shared/routes/profile.route';
import { UNAUTHENTICATED_ROUTE } from './shared/routes/unauthenticated.route';
import { USERS_ROUTE } from './shared/routes/users.route';
import { VBS_ROUTE } from './shared/routes/vbs.route';

const routes: Routes = [
  UNAUTHENTICATED_ROUTE,
  DASHBOARD_ROUTE,
  USERS_ROUTE,
  CHILDREN_ROUTE,
  PROFILE_ROUTE,
  GURDIANS_ROUTE,
  VBS_ROUTE,
  JUNIOR_CHURCH_ROUTE,
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
