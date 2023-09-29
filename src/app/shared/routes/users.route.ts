import { Route } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/guards/feature-access.guard';
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
  canActivate: [AuthGuard, AppAccessGuard, FeatureAccessGuard],
  data: {
    featureAccessGuards: [
      {
        app: App.USERS,
        feature: FeatureType.DETAIL,
        access: Access.READ,
      },
    ],
  },
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
      canActivate: [FeatureAccessGuard],
      component: EditUserComponent,
      resolve: { user: UserResolverService },
      data: {
        featureAccessGuards: [
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
      canActivate: [FeatureAccessGuard],
      component: ResetPasswordComponent,
      data: {
        featureAccessGuards: [
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
