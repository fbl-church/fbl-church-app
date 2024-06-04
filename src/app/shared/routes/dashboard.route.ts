import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const DASHBOARD_ROUTE: Route = {
  path: 'dashboard',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD, FEATURE_ACCESS_GUARD],
  data: {
    FEATURE_ACCESS_GUARDS: [
      {
        app: App.DASHBOARD,
        feature: FeatureType.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      component: DashboardComponent,
      pathMatch: 'full',
    },
  ],
};
