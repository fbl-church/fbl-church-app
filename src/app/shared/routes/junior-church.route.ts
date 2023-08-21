import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { JuniorChurchCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-check-in.component';
import { NewAttendanceRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/new-attendance-record/new-attendance-record.component';
import { JuniorChurchRegistrationWizardComponent } from 'src/app/pages/junior-church/junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchWorkersComponent } from 'src/app/pages/junior-church/junior-church-workers/junior-church-workers.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const JUNIOR_CHURCH_ROUTE: Route = {
  path: 'junior-church',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: JuniorChurchCheckInComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: JuniorChurchRegistrationWizardComponent,
    },
    {
      path: 'check-in',
      component: JuniorChurchCheckInComponent,
    },

    {
      path: 'new-record',
      component: NewAttendanceRecordComponent
    },
    {
      path: 'workers',
      component: JuniorChurchWorkersComponent,
    },
  ],
};
