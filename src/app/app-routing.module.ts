import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCESS_MANAGEMENT_ROUTE } from './shared/routes/access-management.route';
import { CHILDREN_ROUTE } from './shared/routes/children.route';
import { DASHBOARD_ROUTE } from './shared/routes/dashboard.route';
import { GUARDIANS_ROUTE } from './shared/routes/guardians.route';
import { JUNIOR_CHURCH_ROUTE } from './shared/routes/junior-church.route';
import { NURSERY_ROUTE } from './shared/routes/nursery.route';
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
  GUARDIANS_ROUTE,
  VBS_ROUTE,
  JUNIOR_CHURCH_ROUTE,
  ACCESS_MANAGEMENT_ROUTE,
  NURSERY_ROUTE,
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: '**', redirectTo: 'profile', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
