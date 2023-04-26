import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { UserResolverService } from 'src/service/users/user-resolver.service';
import { ClubberDetailComponent } from './pages/clubbers/clubber-detail/clubber-detail.component';
import { ClubberComponent } from './pages/clubbers/clubber.component';
import { CreateClubberComponent } from './pages/clubbers/create-clubber/create-clubber.component';
import { CreateGurdianComponent } from './pages/gurdians/create-gurdian/create-gurdian.component';
import { GurdianDetailComponent } from './pages/gurdians/gurdian-detail/gurdian-detail.component';
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
      // {
      //   path: 'register',
      //   canActivate: [AuthGuard],
      //   component: CreateAccountComponent,
      // },
    ],
  },
  // Authenticated Routes
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
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
        children: [
          {
            path: '',
            component: UserComponent,
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: CreateUserComponent,
          },
          {
            path: ':id/details',
            component: UserDetailComponent,
          },
          {
            path: ':id/details/edit',
            component: EditUserComponent,
            resolve: { user: UserResolverService },
          },
          {
            path: ':id/details/reset-password',
            component: ResetPasswordComponent,
          },
        ],
      },

      {
        path: 'clubbers',
        children: [
          {
            path: '',
            component: ClubberComponent,
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: CreateClubberComponent,
          },
          {
            path: ':id/details',
            component: ClubberDetailComponent,
          },
        ],
      },

      {
        path: 'profile',
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
        children: [
          {
            path: '',
            component: GurdianComponent,
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: CreateGurdianComponent,
          },
          {
            path: ':id/details',
            component: GurdianDetailComponent,
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
