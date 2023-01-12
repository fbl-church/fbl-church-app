import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth-service/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginOverviewComponent } from './pages/login/login-overview/login-overview.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeOverviewComponent } from './pages/welcome/welcome-overview/welcome-overview.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthenticatedLayoutComponent } from './shared/components/authenticated-layout/authenticated-layout.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  // Unauthenticated Routes
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome',
        component: WelcomeOverviewComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'overview',
        canActivate: [AuthGuard],
        component: LoginOverviewComponent,
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
