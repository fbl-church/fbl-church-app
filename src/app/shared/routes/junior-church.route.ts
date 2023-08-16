import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { JuniorChurchRegistrationComponent } from 'src/app/pages/junior-church/junior-church-registration.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const JUNIOR_CHURCH_ROUTE: Route = {
  path: 'junior-church',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: JuniorChurchRegistrationComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: JuniorChurchRegistrationComponent,
    },
    {
      path: 'check-in',
      component: JuniorChurchRegistrationComponent,
    },
    {
      path: 'workers',
      component: JuniorChurchRegistrationComponent,
    },
  ],
};
