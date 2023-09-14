import { Route } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { JuniorChurchAttendanceDetailComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { EditJuniorChurchRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-attendance-record/edit-junior-church-attendance-record.component';
import { EditJuniorChurchChildrenCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-children-check-in/edit-junior-church-children-check-in.component';
import { JuniorChurchCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchChildrenComponent } from 'src/app/pages/junior-church/junior-church-children/junior-church-children.component';
import { JuniorChurchRegistrationWizardComponent } from 'src/app/pages/junior-church/junior-church-registration-wizard/junior-church-registration-wizard.component';
import { JuniorChurchWorkersComponent } from 'src/app/pages/junior-church/junior-church-workers/junior-church-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
import { JuniorChurchChildrenResolverService } from 'src/service/attendance/junior-church-children-resolver.service';
import { JuniorChurchWorkersResolverService } from 'src/service/attendance/junior-church-workers-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const JUNIOR_CHURCH_ROUTE: Route = {
  path: 'junior-church',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, FeatureAccessGuard],
  data: {
    featureAccessGuards: [
      {
        app: App.JUNIOR_CHURCH,
        feature: Feature.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      component: JuniorChurchCheckInComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: JuniorChurchRegistrationWizardComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.REGISTRATION,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'check-in',
      component: JuniorChurchCheckInComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.CHECK_IN,
            access: Access.READ,
          },
        ],
      },
    },

    {
      path: 'check-in/:id/details',
      component: JuniorChurchAttendanceDetailComponent,
      resolve: { attendanceRecord: AttendanceRecordResolverService },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'check-in/:id/details/edit',
      component: EditJuniorChurchRecordComponent,
      resolve: {
        attendanceRecord: AttendanceRecordResolverService,
        workers: JuniorChurchWorkersResolverService,
      },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: 'check-in/:id/details/children/edit',
      component: EditJuniorChurchChildrenCheckInComponent,
      resolve: {
        attendanceChildren: JuniorChurchChildrenResolverService,
      },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: 'new-record',
      component: JuniorChurchNewAttendanceRecordComponent,
      resolve: { workers: JuniorChurchWorkersResolverService },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: Feature.OVERVIEW,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'workers',
      component: JuniorChurchWorkersComponent,
    },
    {
      path: 'children',
      component: JuniorChurchChildrenComponent,
    },
  ],
};
