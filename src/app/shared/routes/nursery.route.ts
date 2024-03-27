import { Route } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { NurseryAttendanceDetailComponent } from 'src/app/pages/nursery/nursery-check-in/nursery-attendance-detail/nursery-attendance-detail.component';
import { EditNurseryRecordComponent } from 'src/app/pages/nursery/nursery-check-in/nursery-attendance-detail/pages/edit-nursery-attendance-record/edit-nursery-attendance-record.component';
import { NurseryChildrenCheckInComponent } from 'src/app/pages/nursery/nursery-check-in/nursery-attendance-detail/pages/nursery-children-check-in/nursery-children-check-in.component';
import { NurseryCheckInComponent } from 'src/app/pages/nursery/nursery-check-in/nursery-check-in.component';
import { NurseryNewAttendanceRecordComponent } from 'src/app/pages/nursery/nursery-check-in/nursery-new-attendance-record/nursery-new-attendance-record.component';
import { NurseryChildDetailComponent } from 'src/app/pages/nursery/nursery-children/nursery-child-detail/nursery-child-detail.component';
import { NurseryChildrenComponent } from 'src/app/pages/nursery/nursery-children/nursery-children.component';
import { NurseryWorkersComponent } from 'src/app/pages/nursery/nursery-workers/nursery-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
import { NurseryWorkersResolverService } from 'src/service/attendance/nursery-workers-resolver.service';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';
import { ChildRegistrationWizardComponent } from '../components/wizards/child-registration/child-registration-wizard.component';

export const NURSERY_ROUTE: Route = {
  path: 'nursery',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD, FEATURE_ACCESS_GUARD],
  data: {
    FEATURE_ACCESS_GUARDs: [
      {
        app: App.NURSERY,
        feature: FeatureType.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      redirectTo: 'check-in',
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: ChildRegistrationWizardComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.REGISTRATION,
            access: Access.CREATE,
          },
        ],
        wizardData: {
          baseRoute: '/nursery',
          translation: 'Nursery',
          filteredOutGroups: [ChurchGroup.NURSERY],
          registrationGroup: ChurchGroup.NURSERY,
        },
      },
    },
    {
      path: 'check-in',
      component: NurseryCheckInComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.CHECK_IN,
            access: Access.READ,
          },
        ],
      },
    },

    {
      path: 'check-in/:id/details',
      component: NurseryAttendanceDetailComponent,
      resolve: { attendanceRecord: AttendanceRecordResolverService },
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'check-in/:id/details/edit',
      component: EditNurseryRecordComponent,
      resolve: {
        attendanceRecord: AttendanceRecordResolverService,
        workers: NurseryWorkersResolverService,
      },
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: 'check-in/:id/details/children',
      component: NurseryChildrenCheckInComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.CHECK_IN,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: 'new-record',
      component: NurseryNewAttendanceRecordComponent,
      resolve: { workers: NurseryWorkersResolverService },
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.OVERVIEW,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'workers',
      component: NurseryWorkersComponent,
    },
    {
      path: 'children',
      component: NurseryChildrenComponent,
    },
    {
      path: 'children/:id/details',
      component: NurseryChildDetailComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { child: ChildResolverService },
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.NURSERY,
            feature: FeatureType.OVERVIEW,
            access: Access.READ,
          },
        ],
      },
    },
  ],
};
