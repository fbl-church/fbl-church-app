import { Route } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { CreateUserComponent } from 'src/app/pages/users/create-user/create-user.component';
import { EditUserRolesComponent } from 'src/app/pages/users/user-detail/pages/edit-user-roles/edit-user-roles.component';
import { EditUserComponent } from 'src/app/pages/users/user-detail/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from 'src/app/pages/users/user-detail/pages/reset-password/reset-password.component';
import { UserDetailComponent } from 'src/app/pages/users/user-detail/user-detail.component';
import { UserComponent } from 'src/app/pages/users/user.component';
import { UserResolverService } from 'src/service/users/user-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const USERS_ROUTE: Route = {
  path: 'users',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: UserComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      canActivate: [FeatureAccessGuard],
      component: CreateUserComponent,
      data: {
        featureAccessGuards: [
          {
            app: App.USERS,
            feature: Feature.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      canActivate: [FeatureAccessGuard],
      component: UserDetailComponent,
      resolve: { user: UserResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.USERS,
            feature: Feature.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: ':id/details/edit',
      canActivate: [FeatureAccessGuard],
      component: EditUserComponent,
      resolve: { user: UserResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.USERS,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/roles/edit',
      canActivate: [FeatureAccessGuard],
      component: EditUserRolesComponent,
      resolve: { user: UserResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.USERS,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/reset-password',
      canActivate: [FeatureAccessGuard],
      component: ResetPasswordComponent,
      data: {
        featureAccessGuards: [
          {
            app: App.USERS,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
