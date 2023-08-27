import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { AccessManagerComponent } from 'src/app/pages/access-management/access-manager.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const ACCESS_MANAGEMENT_ROUTE: Route = {
  path: 'access-manager',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: AccessManagerComponent,
      pathMatch: 'full',
    },
    {
      path: 'applications',
      component: AccessManagerComponent,
      pathMatch: 'full',
    },
  ],
};
