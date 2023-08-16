import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { JuniorChurchRegistrationWizardComponent } from 'src/app/pages/junior-church/junior-church-registration-wizard/junior-church-registration-wizard.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const JUNIOR_CHURCH_ROUTE: Route = {
  path: 'junior-church',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: JuniorChurchRegistrationWizardComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: JuniorChurchRegistrationWizardComponent,
    },
    {
      path: 'check-in',
      component: JuniorChurchRegistrationWizardComponent,
    },
    {
      path: 'workers',
      component: JuniorChurchRegistrationWizardComponent,
    },
  ],
};
