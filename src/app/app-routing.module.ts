import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { ChildGurdiansResolverService } from 'src/service/children/child-gurdians-resolver.service';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { GurdianResolverService } from 'src/service/gurdians/gurdian-resolver.service';
import { UserResolverService } from 'src/service/users/user-resolver.service';
import { ChildDetailComponent } from './pages/children/child-detail/child-detail.component';
import { EditChildGurdiansComponent } from './pages/children/child-detail/pages/edit-child-gurdians/edit-child-gurdians.component';
import { EditChildComponent } from './pages/children/child-detail/pages/edit-child/edit-child.component';
import { ChildrenComponent } from './pages/children/children.component';
import { CreateChildComponent } from './pages/children/create-child/create-child.component';
import { CreateGurdianComponent } from './pages/gurdians/create-gurdian/create-gurdian.component';
import { GurdianDetailComponent } from './pages/gurdians/gurdian-detail/gurdian-detail.component';
import { EditGurdianComponent } from './pages/gurdians/gurdian-detail/pages/edit-gurdian/edit-gurdian.component';
import { GurdianComponent } from './pages/gurdians/gurdian.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginOverviewComponent } from './pages/login/login-overview/login-overview.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdatePasswordComponent } from './pages/profile/update-password/update-password.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { EditUserComponent } from './pages/users/user-detail/pages/edit-user/edit-user.component';
import { ResetPasswordComponent } from './pages/users/user-detail/pages/reset-password/reset-password.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { UserComponent } from './pages/users/user.component';
import { AuthenticatedLayoutComponent } from './shared/components/layouts/authenticated-layout/authenticated-layout.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  // Unauthenticated Routes
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        canActivate: [AuthGuard],
        component: LoginOverviewComponent,
      },
    ],
  },
  // Authenticated Routes
  {
    path: 'home',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
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
  },
  {
    path: 'children',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChildrenComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateChildComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          featureAccessGuards: [
            {
              app: App.CHILDREN,
              feature: Feature.DETAIL,
              access: Access.CREATE,
            },
          ],
        },
      },
      {
        path: ':id/details',
        component: ChildDetailComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          featureAccessGuards: [
            {
              app: App.CHILDREN,
              feature: Feature.DETAIL,
              access: Access.READ,
            },
          ],
        },
      },
      {
        path: ':id/details/edit',
        canActivate: [FeatureAccessGuard],
        component: EditChildComponent,
        resolve: { user: ChildResolverService },
        data: {
          featureAccessGuards: [
            {
              app: App.CHILDREN,
              feature: Feature.DETAIL,
              access: Access.UPDATE,
            },
          ],
        },
      },
      {
        path: ':id/details/gurdians/edit',
        canActivate: [FeatureAccessGuard],
        component: EditChildGurdiansComponent,
        resolve: { gurdians: ChildGurdiansResolverService },
        data: {
          featureAccessGuards: [
            {
              app: App.CHILDREN,
              feature: Feature.DETAIL,
              access: Access.UPDATE,
            },
          ],
        },
      },
    ],
  },
  {
    path: 'profile',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
      },
      {
        path: 'reset-password',
        component: UpdatePasswordComponent,
      },
    ],
  },
  {
    path: 'gurdians',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GurdianComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateGurdianComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          featureAccessGuards: [
            {
              app: App.GURDIANS,
              feature: Feature.DETAIL,
              access: Access.CREATE,
            },
          ],
        },
      },
      {
        path: ':id/details',
        component: GurdianDetailComponent,
        canActivate: [FeatureAccessGuard],
        data: {
          featureAccessGuards: [
            {
              app: App.GURDIANS,
              feature: Feature.DETAIL,
              access: Access.READ,
            },
          ],
        },
      },
      {
        path: ':id/details/edit',
        canActivate: [FeatureAccessGuard],
        component: EditGurdianComponent,
        resolve: { gurdian: GurdianResolverService },
        data: {
          featureAccessGuards: [
            {
              app: App.GURDIANS,
              feature: Feature.DETAIL,
              access: Access.UPDATE,
            },
          ],
        },
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
