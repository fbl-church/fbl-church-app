import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { AwanaAttendanceDetailComponent } from 'src/app/pages/awana/awana-check-in/awana-attendance-detail/awana-attendance-detail.component';
import { AwanaCheckInComponent } from 'src/app/pages/awana/awana-check-in/awana-check-in.component';
import { AwanaNewAttendanceRecordComponent } from 'src/app/pages/awana/awana-check-in/awana-new-attendance-record/awana-new-attendance-record.component';
import { AwanaChildrenDetailComponent } from 'src/app/pages/awana/awana-children/awana-children-detail/awana-children-detail.component';
import { AwanaChildrenComponent } from 'src/app/pages/awana/awana-children/awana-children.component';
import { AwanaWorkersComponent } from 'src/app/pages/awana/awana-workers/awana-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
import { AwanaWorkersResolverService } from 'src/service/attendance/awana-workers-resolver.service copy';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const AWANA_ROUTE: Route = {
  path: 'awana',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, AppAccessGuard],
  children: [
    {
      path: '',
      redirectTo: 'check-in',
      pathMatch: 'full',
    },
    {
      path: 'check-in',
      component: AwanaCheckInComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.AWANA,
            feature: FeatureType.CHECK_IN,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'check-in/:id/details',
      component: AwanaAttendanceDetailComponent,
      resolve: { attendanceRecord: AttendanceRecordResolverService },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.AWANA,
            feature: FeatureType.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'new-record',
      component: AwanaNewAttendanceRecordComponent,
      resolve: { workers: AwanaWorkersResolverService },
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.OVERVIEW,
            access: Access.CREATE,
          },
        ],
      },
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
      canActivate: [FeatureAccessGuard],
      resolve: { child: ChildResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.AWANA,
            feature: FeatureType.OVERVIEW,
            access: Access.READ,
          },
        ],
      },
    },
  ],
};
