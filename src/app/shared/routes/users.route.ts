import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { USER_EDIT_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/user-edit-access.guard';
import { CreateUserComponent } from 'src/app/pages/users/create-user/create-user.component';
import { EditUserComponent } from 'src/app/pages/users/user-detail/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from 'src/app/pages/users/user-detail/pages/reset-password/reset-password.component';
import { UserDetailComponent } from 'src/app/pages/users/user-detail/user-detail.component';
import { UserComponent } from 'src/app/pages/users/user.component';
import { UserResolverService } from 'src/service/users/user-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const USERS_ROUTE: Route = {
  path: 'users',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      component: UserComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      canActivate: [FEATURE_ACCESS_GUARD],
      component: CreateUserComponent,
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.USERS,
            feature: FeatureType.OVERVIEW,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      component: UserDetailComponent,
      resolve: { user: UserResolverService },
    },
    {
      path: ':id/details/edit',
      canActivate: [FEATURE_ACCESS_GUARD, USER_EDIT_ACCESS_GUARD],
      component: EditUserComponent,
      resolve: { user: UserResolverService },
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.USERS,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/reset-password',
      canActivate: [FEATURE_ACCESS_GUARD, USER_EDIT_ACCESS_GUARD],
      component: ResetPasswordComponent,
      data: {
        FEATURE_ACCESS_GUARDS: [
          {
            app: App.USERS,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
