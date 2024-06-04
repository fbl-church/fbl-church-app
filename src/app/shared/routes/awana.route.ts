import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { AwanaAttendanceDetailComponent } from 'src/app/pages/awana/awana-check-in/awana-attendance-detail/awana-attendance-detail.component';
import { AwanaCheckInComponent } from 'src/app/pages/awana/awana-check-in/awana-check-in.component';
import { AwanaNewAttendanceRecordComponent } from 'src/app/pages/awana/awana-check-in/awana-new-attendance-record/awana-new-attendance-record.component';
import { AwanaChildrenDetailComponent } from 'src/app/pages/awana/awana-children/awana-children-detail/awana-children-detail.component';
import { AwanaChildrenComponent } from 'src/app/pages/awana/awana-children/awana-children.component';
import { AwanaGrandPrixComponent } from 'src/app/pages/awana/awana-grand-prix/awana-grand-prix.component';
import { AwanaWorkersComponent } from 'src/app/pages/awana/awana-workers/awana-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
import { AwanaWorkersResolverService } from 'src/service/attendance/awana-workers-resolver.service';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const AWANA_ROUTE: Route = {
  path: 'awana',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'check-in',
      pathMatch: 'full',
    },
    {
      path: 'check-in',
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.AWANA,
            feature: FeatureType.CHECK_IN_OVERVIEW,
            access: Access.READ,
          },
        ],
      },
      children: [
        {
          path: '',
          component: AwanaCheckInComponent,
        },
        {
          path: ':id/details',
          component: AwanaAttendanceDetailComponent,
          resolve: { attendanceRecord: AttendanceRecordResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.AWANA,
                feature: FeatureType.DETAIL,
                access: Access.READ,
              },
            ],
          },
        },
        {
          path: 'new',
          component: AwanaNewAttendanceRecordComponent,
          resolve: { workers: AwanaWorkersResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.AWANA,
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
      component: AwanaWorkersComponent,
    },
    {
      path: 'children',
      component: AwanaChildrenComponent,
    },
    {
      path: 'children/:id/details',
      component: AwanaChildrenDetailComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { child: ChildResolverService },
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.AWANA,
            feature: FeatureType.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'grand-prix',
      component: AwanaGrandPrixComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.AWANA,
            feature: FeatureType.GRAND_PRIX,
            access: Access.READ,
          },
        ],
      },
    },
  ],
};
