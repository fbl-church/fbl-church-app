import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const DASHBOARD_ROUTE: Route = {
  path: 'dashboard',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: DashboardComponent,
      pathMatch: 'full',
    },
  ],
};
