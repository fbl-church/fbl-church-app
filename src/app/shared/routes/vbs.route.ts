import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { VBSRegistrationComponent } from 'src/app/pages/vbs/vbs-registration.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: VBSRegistrationComponent,
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
