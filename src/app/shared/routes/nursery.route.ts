import { Route } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
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
import { ChildrenService } from 'src/service/children/children.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';
import { ChildRegistrationWizardComponent } from '../components/wizards/child-registration/child-registration-wizard.component';

export const NURSERY_ROUTE: Route = {
  path: 'nursery',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
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
        FEATURE_ACCESS_GUARDS: [
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
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.NURSERY,
            feature: FeatureType.CHECK_IN_OVERVIEW,
            access: Access.READ,
          },
        ],
      },
      children: [
        {
          path: '',
          component: NurseryCheckInComponent,
        },
        {
          path: ':id/details',
          component: NurseryAttendanceDetailComponent,
          resolve: { attendanceRecord: AttendanceRecordResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.NURSERY,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.READ,
              },
            ],
          },
        },
        {
          path: ':id/details/edit',
          component: EditNurseryRecordComponent,
          resolve: {
            attendanceRecord: AttendanceRecordResolverService,
            workers: NurseryWorkersResolverService,
          },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.NURSERY,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
          },
        },
        {
          path: ':id/details/children',
          component: NurseryChildrenCheckInComponent,
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.NURSERY,
                feature: FeatureType.CHECK_IN_CHILDREN,
                access: Access.UPDATE,
              },
            ],
          },
        },
        {
          path: 'new',
          component: NurseryNewAttendanceRecordComponent,
          resolve: { workers: NurseryWorkersResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.NURSERY,
                feature: FeatureType.CHECK_IN_OVERVIEW,
                access: Access.CREATE,
              },
            ],
          },
        },
      ],
    },
    {
      path: 'workers',
      component: NurseryWorkersComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.NURSERY,
            feature: FeatureType.WORKERS,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'children',
      component: NurseryChildrenComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.NURSERY,
            feature: FeatureType.CHILDREN,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'children/:id/details',
      component: NurseryChildDetailComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { child: RouteDataResolver.for(ChildrenService) },
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.NURSERY,
            feature: FeatureType.CHILDREN,
            access: Access.READ,
          },
        ],
      },
    },
  ],
};
