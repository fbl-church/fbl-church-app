import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { JuniorChurchAttendanceDetailComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { JuniorChurchCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchRegistrationWizardComponent } from 'src/app/pages/junior-church/junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchWorkersComponent } from 'src/app/pages/junior-church/junior-church-workers/junior-church-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
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
      path: 'check-in/:id/details',
      component: JuniorChurchAttendanceDetailComponent,
      resolve: { attendanceRecord: AttendanceRecordResolverService },
    },

    {
      path: 'new-record',
      component: JuniorChurchNewAttendanceRecordComponent,
    },
    {
      path: 'workers',
      component: JuniorChurchWorkersComponent,
    },
  ],
};