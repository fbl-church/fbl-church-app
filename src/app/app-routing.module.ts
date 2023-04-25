import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { ClubberDetailComponent } from './pages/clubbers/clubber-detail/clubber-detail.component';
import { ClubberComponent } from './pages/clubbers/clubber.component';
import { CreateClubberComponent } from './pages/clubbers/create-clubber/create-clubber.component';
import { CreateGurdianComponent } from './pages/gurdians/create-gurdian/create-gurdian.component';
import { GurdianDetailComponent } from './pages/gurdians/gurdian-detail/gurdian-detail.component';
import { GurdianComponent } from './pages/gurdians/gurdian.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountComponent } from './pages/login/create-account/create-accountcomponent';
import { LoginOverviewComponent } from './pages/login/login-overview/login-overview.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
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
      {
        path: 'register',
        canActivate: [AuthGuard],
        component: CreateAccountComponent,
      },
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
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UserComponent,
        pathMatch: 'full',
      },
      {
        path: 'users/create',
        component: CreateUserComponent,
        pathMatch: 'full',
      },
      {
        path: 'users/:id/details',
        component: UserDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'clubbers',
        component: ClubberComponent,
        pathMatch: 'full',
      },
      {
        path: 'clubbers/create',
        component: CreateClubberComponent,
        pathMatch: 'full',
      },
      {
        path: 'clubbers/:id/details',
        component: ClubberDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'gurdians',
        component: GurdianComponent,
        pathMatch: 'full',
      },
      {
        path: 'gurdians/create',
        component: CreateGurdianComponent,
        pathMatch: 'full',
      },
      {
        path: 'gurdians/:id/details',
        component: GurdianDetailComponent,
        pathMatch: 'full',
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
