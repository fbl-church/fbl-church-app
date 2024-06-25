import { Route } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { WEB_ROLE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/web-role-access.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { ProfileChildDetailsComponent } from 'src/app/pages/profile/profile-child-details/profile-child-details.component';
import { ProfileChildEditComponent } from 'src/app/pages/profile/profile-child-details/profile-child-edit/profile-child-edit.component';
import { ProfileEditComponent } from 'src/app/pages/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { UpdatePasswordComponent } from 'src/app/pages/profile/update-password/update-password.component';
import { ScheduleComponent } from 'src/app/pages/schedule/schedule.component';
import { ChildrenService } from 'src/service/children/children.service';
import { ProfileResolverService } from 'src/service/users/profile-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      component: ProfileComponent,
      resolve: { currentUser: ProfileResolverService },
      pathMatch: 'full',
    },
    {
      path: 'schedule',
      component: ScheduleComponent,
    },
    {
      path: 'edit',
      resolve: { currentUser: ProfileResolverService },
      component: ProfileEditComponent,
    },
    {
      path: 'reset-password',
      component: UpdatePasswordComponent,
    },
    {
      path: 'child/:id',
      component: ProfileChildDetailsComponent,
      canActivate: [WEB_ROLE_ACCESS_GUARD],
      resolve: { child: RouteDataResolver.for(ChildrenService) },
      data: {
        roles: [WebRole.GUARDIAN],
      },
    },
    {
      path: 'child/:id/edit',
      component: ProfileChildEditComponent,
      canActivate: [WEB_ROLE_ACCESS_GUARD],
      resolve: { child: RouteDataResolver.for(ChildrenService) },
      data: {
        roles: [WebRole.GUARDIAN],
      },
    },
  ],
};
