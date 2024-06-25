import { Route } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { JuniorChurchAttendanceDetailComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/junior-church-attendance-detail.component';
import { EditJuniorChurchRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/pages/edit-junior-church-attendance-record/edit-junior-church-attendance-record.component';
import { JuniorChurchChildrenCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-attendance-detail/pages/junior-church-children-check-in/junior-church-children-check-in.component';
import { JuniorChurchCheckInComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-check-in.component';
import { JuniorChurchNewAttendanceRecordComponent } from 'src/app/pages/junior-church/junior-church-check-in/junior-church-new-attendance-record/junior-church-new-attendance-record.component';
import { JuniorChurchChildDetailComponent } from 'src/app/pages/junior-church/junior-church-children/junior-church-child-detail/junior-church-child-detail.component';
import { JuniorChurchChildrenComponent } from 'src/app/pages/junior-church/junior-church-children/junior-church-children.component';
import { JuniorChurchLessonsComponent } from 'src/app/pages/junior-church/junior-church-lessons/junior-church-lessons.component';
import { LessonsUploadComponent } from 'src/app/pages/junior-church/junior-church-lessons/lessons-upload/lessons-upload.component';
import { JuniorChurchWorkersComponent } from 'src/app/pages/junior-church/junior-church-workers/junior-church-workers.component';
import { AttendanceRecordResolverService } from 'src/service/attendance/attendance-record-resolver.service';
import { JuniorChurchWorkersResolverService } from 'src/service/attendance/junior-church-workers-resolver.service';
import { ChildrenService } from 'src/service/children/children.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';
import { ChildRegistrationWizardComponent } from '../components/wizards/child-registration/child-registration-wizard.component';

export const JUNIOR_CHURCH_ROUTE: Route = {
  path: 'junior-church',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: 'registration',
      component: ChildRegistrationWizardComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.REGISTRATION,
            access: Access.CREATE,
          },
        ],
        wizardData: {
          baseRoute: '/junior-church',
          translation: 'Junior Church',
          filteredOutGroups: [ChurchGroup.JUNIOR_CHURCH],
          registrationGroup: ChurchGroup.JUNIOR_CHURCH,
        },
      },
    },
    {
      path: 'check-in',
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.CHECK_IN_OVERVIEW,
            access: Access.READ,
          },
        ],
      },
      children: [
        {
          path: '',
          component: JuniorChurchCheckInComponent,
        },
        {
          path: ':id/details',
          component: JuniorChurchAttendanceDetailComponent,
          resolve: { attendanceRecord: AttendanceRecordResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.JUNIOR_CHURCH,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.READ,
              },
            ],
          },
        },
        {
          path: ':id/details/edit',
          component: EditJuniorChurchRecordComponent,
          resolve: {
            attendanceRecord: AttendanceRecordResolverService,
            workers: JuniorChurchWorkersResolverService,
          },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.JUNIOR_CHURCH,
                feature: FeatureType.CHECK_IN_DETAIL,
                access: Access.UPDATE,
              },
            ],
          },
        },
        {
          path: ':id/details/children',
          component: JuniorChurchChildrenCheckInComponent,
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.JUNIOR_CHURCH,
                feature: FeatureType.CHECK_IN_CHILDREN,
                access: Access.UPDATE,
              },
            ],
          },
        },
        {
          path: 'new',
          component: JuniorChurchNewAttendanceRecordComponent,
          resolve: { workers: JuniorChurchWorkersResolverService },
          canActivate: [FEATURE_ACCESS_GUARD],
          data: {
            FEATURE_ACCESS_GUARDS: [
              {
                app: App.JUNIOR_CHURCH,
                feature: FeatureType.CHECK_IN_OVERVIEW,
                access: Access.CREATE,
              },
            ],
          },
        },
      ],
    },
    {
      path: 'lessons',
      component: JuniorChurchLessonsComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.LESSONS,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'lessons/upload',
      component: LessonsUploadComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.LESSONS,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'workers',
      component: JuniorChurchWorkersComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.WORKERS,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'children',
      component: JuniorChurchChildrenComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.CHILDREN,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: 'children/:id/details',
      component: JuniorChurchChildDetailComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { child: RouteDataResolver.for(ChildrenService) },
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.CHILDREN,
            access: Access.READ,
          },
        ],
      },
    },
    { path: '', redirectTo: 'check-in', pathMatch: 'full' },
    { path: '**', redirectTo: 'check-in', pathMatch: 'full' },
  ],
};
