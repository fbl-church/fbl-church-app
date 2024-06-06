import { Route } from '@angular/router';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { VBSDashboardComponent } from 'src/app/pages/vbs/dashboard/vbs-dashboard.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: VBSDashboardComponent,
    },
    {
      path: 'registration',
      component: VBSDashboardComponent,
    },
    {
      path: 'groups',
      component: VBSDashboardComponent,
    },
  ],
};
