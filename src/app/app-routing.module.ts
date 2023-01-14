import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth-service/auth.guard';
import { AboutOverviewComponent } from './pages/about/about-overview/about-overview.component';
import { AboutComponent } from './pages/about/about.component';
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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: WelcomeOverviewComponent,
      },
    ],
  },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'register',
        component: WelcomeOverviewComponent,
      },
    ],
  },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'news',
        component: WelcomeOverviewComponent,
      },
    ],
  },
  {
    path: '',
    component: AboutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'about',
        component: AboutOverviewComponent,
      },
    ],
  },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'contact',
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
        path: 'authRoute',
        component: null,
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
