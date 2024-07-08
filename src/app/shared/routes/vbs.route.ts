import { Route } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { VBSGroupDetailsComponent } from 'src/app/pages/vbs/groups/detail/vbs-group-details.component';
import { VBSCreateThemeComponent } from 'src/app/pages/vbs/themes/create-theme/vbs-create-theme.component';
import { VBSThemeDetailsComponent } from 'src/app/pages/vbs/themes/theme-details/vbs-theme-details.component';
import { VBSThemesComponent } from 'src/app/pages/vbs/themes/vbs-themes.component';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';
import { VBSAttendanceDetailEditComponent } from '../components/pages/vbs/vbs-attendance-detail-edit/vbs-attendance-detail-edit.component';
import { VBSAttendanceChildrenCheckInComponent } from '../components/pages/vbs/vbs-attendance-detail/vbs-attendance-children-check-in/vbs-attendance-children-check-in.component';
import { VBSAttendanceChildrenPointsComponent } from '../components/pages/vbs/vbs-attendance-detail/vbs-attendance-children-points/vbs-attendance-children-points.component';
import { VBSAttendanceDetailComponent } from '../components/pages/vbs/vbs-attendance-detail/vbs-attendance-detail.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'themes',
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.VBS,
            feature: FeatureType.THEMES,
            access: Access.READ,
          },
        ],
      },
      children: [
        {
          path: '',
          component: VBSThemesComponent,
        },
        {
          path: 'new',
          component: VBSCreateThemeComponent,
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.THEMES,
                access: Access.CREATE,
              },
            ],
          },
        },
        {
          path: ':id',
          component: VBSThemeDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService) },
        },
        {
          path: ':id/attendance/:attendanceId',
          component: VBSAttendanceDetailComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            workerRoles: [
              WebRole.VBS_JUNIOR,
              WebRole.VBS_MIDDLER,
              WebRole.VBS_PRE_PRIMARY,
              WebRole.VBS_PRIMARY,
              WebRole.VBS_CRAFTS,
              WebRole.VBS_GAMES,
              WebRole.VBS_REGISTRATION,
              WebRole.VBS_SNACKS,
            ],
            group: [
              ChurchGroup.VBS_PRE_PRIMARY,
              ChurchGroup.VBS_PRIMARY,
              ChurchGroup.VBS_MIDDLER,
              ChurchGroup.VBS_JUNIOR,
            ],
            route: '/vbs/themes',
          },
        },
        {
          path: ':id/attendance/:attendanceId/children',
          component: VBSAttendanceChildrenCheckInComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            group: [
              ChurchGroup.VBS_PRE_PRIMARY,
              ChurchGroup.VBS_PRIMARY,
              ChurchGroup.VBS_MIDDLER,
              ChurchGroup.VBS_JUNIOR,
            ],
            route: '/vbs/themes',
          },
        },
        {
          path: ':id/attendance/:attendanceId/edit',
          component: VBSAttendanceDetailEditComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
            route: '/vbs/themes',
          },
        },
      ],
    },
    {
      path: 'registration',
      component: VBSThemesComponent,
    },
    {
      path: 'groups',
      children: [
        // VBS PRE-PRIMARY
        {
          path: 'pre-primary',
          component: VBSGroupDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService, { method: 'getLatestActive', routeParams: [] }) },
          data: {
            group: ChurchGroup.VBS_PRE_PRIMARY,
            route: '/vbs/groups/pre-primary',
          },
        },
        {
          path: 'pre-primary/attendance/:attendanceId',
          component: VBSAttendanceDetailComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            workerRoles: [WebRole.VBS_PRE_PRIMARY],
            group: [ChurchGroup.VBS_PRE_PRIMARY],
            route: '/vbs/groups/pre-primary',
          },
        },
        {
          path: 'pre-primary/attendance/:attendanceId/children',
          component: VBSAttendanceChildrenCheckInComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            group: [ChurchGroup.VBS_PRE_PRIMARY],
            route: '/vbs/groups/pre-primary',
          },
        },
        {
          path: 'pre-primary/attendance/:attendanceId/children/points',
          component: VBSAttendanceChildrenPointsComponent,
          data: {
            group: ChurchGroup.VBS_PRE_PRIMARY,
            route: '/vbs/groups/pre-primary',
          },
        },
        {
          path: 'pre-primary/attendance/:attendanceId/edit',
          component: VBSAttendanceDetailEditComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
            route: '/vbs/groups/pre-primary',
          },
        },

        // VBS PRIMARY
        {
          path: 'primary',
          component: VBSGroupDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService, { method: 'getLatestActive', routeParams: [] }) },
          data: {
            group: ChurchGroup.VBS_PRIMARY,
            route: '/vbs/groups/primary',
          },
        },
        {
          path: 'primary/attendance/:attendanceId',
          component: VBSAttendanceDetailComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            workerRoles: [WebRole.VBS_PRIMARY],
            group: [ChurchGroup.VBS_PRIMARY],
            route: '/vbs/groups/primary',
          },
        },
        {
          path: 'primary/attendance/:attendanceId/children',
          component: VBSAttendanceChildrenCheckInComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            group: [ChurchGroup.VBS_PRIMARY],
            route: '/vbs/groups/primary',
          },
        },
        {
          path: 'primary/attendance/:attendanceId/children/points',
          component: VBSAttendanceChildrenPointsComponent,
          data: {
            group: ChurchGroup.VBS_PRIMARY,
            route: '/vbs/groups/primary',
          },
        },
        {
          path: 'primary/attendance/:attendanceId/edit',
          component: VBSAttendanceDetailEditComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
            route: '/vbs/groups/primary',
          },
        },

        // VBS MIDDLER
        {
          path: 'middler',
          component: VBSGroupDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService, { method: 'getLatestActive', routeParams: [] }) },
          data: {
            group: ChurchGroup.VBS_MIDDLER,
            route: '/vbs/groups/middler',
          },
        },
        {
          path: 'middler/attendance/:attendanceId',
          component: VBSAttendanceDetailComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            workerRoles: [WebRole.VBS_MIDDLER],
            group: [ChurchGroup.VBS_MIDDLER],
            route: '/vbs/groups/middler',
          },
        },
        {
          path: 'middler/attendance/:attendanceId/children',
          component: VBSAttendanceChildrenCheckInComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            group: [ChurchGroup.VBS_MIDDLER],
            route: '/vbs/groups/middler',
          },
        },
        {
          path: 'middler/attendance/:attendanceId/children/points',
          component: VBSAttendanceChildrenPointsComponent,
          data: {
            group: ChurchGroup.VBS_MIDDLER,
            route: '/vbs/groups/middler',
          },
        },
        {
          path: 'middler/attendance/:attendanceId/edit',
          component: VBSAttendanceDetailEditComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
            route: '/vbs/groups/middler',
          },
        },

        // VBS JUNIOR
        {
          path: 'junior',
          component: VBSGroupDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService, { method: 'getLatestActive', routeParams: [] }) },
          data: {
            group: ChurchGroup.VBS_JUNIOR,
            route: '/vbs/groups/junior',
          },
        },
        {
          path: 'junior/attendance/:attendanceId',
          component: VBSAttendanceDetailComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            workerRoles: [WebRole.VBS_JUNIOR],
            group: [ChurchGroup.VBS_JUNIOR],
            route: '/vbs/groups/junior',
          },
        },
        {
          path: 'junior/attendance/:attendanceId/children',
          component: VBSAttendanceChildrenCheckInComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          data: {
            group: [ChurchGroup.VBS_JUNIOR],
            route: '/vbs/groups/junior',
          },
        },
        {
          path: 'junior/attendance/:attendanceId/children/points',
          component: VBSAttendanceChildrenPointsComponent,
          data: {
            group: ChurchGroup.VBS_JUNIOR,
            route: '/vbs/groups/junior',
          },
        },
        {
          path: 'junior/attendance/:attendanceId/edit',
          component: VBSAttendanceDetailEditComponent,
          resolve: { record: RouteDataResolver.for(VBSAttendanceService, { routeParams: ['attendanceId'] }) },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.VBS,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
            route: '/vbs/groups/junior',
          },
        },
      ],
    },
  ],
};
