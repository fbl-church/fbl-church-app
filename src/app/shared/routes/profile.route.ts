import { Route } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { WebRoleAccessGuard } from 'projects/insite-kit/src/service/guards/web-role-access.guard';
import { ProfileChildDetailsComponent } from 'src/app/pages/profile/profile-child-details/profile-child-details.component';
import { ProfileChildEditComponent } from 'src/app/pages/profile/profile-child-details/profile-child-edit/profile-child-edit.component';
import { ProfileEditComponent } from 'src/app/pages/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { UpdatePasswordComponent } from 'src/app/pages/profile/update-password/update-password.component';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { ProfileResolverService } from 'src/service/users/profile-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, AppAccessGuard],
  children: [
    {
      path: '',
      component: ProfileComponent,
      resolve: { currentUser: ProfileResolverService },
      pathMatch: 'full',
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
      canActivate: [WebRoleAccessGuard],
      resolve: { child: ChildResolverService },
      data: {
        roles: [WebRole.GUARDIAN],
      },
    },
    {
      path: 'child/:id/edit',
      component: ProfileChildEditComponent,
      canActivate: [WebRoleAccessGuard],
      resolve: { child: ChildResolverService },
      data: {
        roles: [WebRole.GUARDIAN],
      },
    },
  ],
};
