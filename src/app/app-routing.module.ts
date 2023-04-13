import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../projects/insite-kit/src/service/auth-service/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountComponent } from './pages/login/create-account/create-accountcomponent';
import { LoginOverviewComponent } from './pages/login/login-overview/login-overview.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticatedLayoutComponent } from './shared/components/authenticated-layout/authenticated-layout.component';

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
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
