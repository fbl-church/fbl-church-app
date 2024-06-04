import { Route } from '@angular/router';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { VBSRegistrationComponent } from 'src/app/pages/vbs/vbs-registration.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: VBSRegistrationComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: VBSRegistrationComponent,
    },
    {
      path: 'groups',
      component: VBSRegistrationComponent,
    },
  ],
};
