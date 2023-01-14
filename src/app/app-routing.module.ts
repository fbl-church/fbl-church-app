import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth-service/auth.guard';
import { LoginOverviewComponent } from './login/login-overview/login-overview.component';
import { LoginComponent } from './login/login.component';
import { AuthenticatedLayoutComponent } from './shared/components/authenticated-layout/authenticated-layout.component';
import { BaseLayoutComponent } from './shared/components/base-layout/base-layout.component';
import { AboutOverviewComponent } from './welcome/about/about-overview/about-overview.component';
import { AboutComponent } from './welcome/about/about.component';
import { ContactOverviewComponent } from './welcome/contact/contact-overview/contact-overview.component';
import { ContactComponent } from './welcome/contact/contact.component';
import { HomeOverviewComponent } from './welcome/home/home-overview/home-overview.component';
import { HomeComponent } from './welcome/home/home.component';
import { NewsOverviewComponent } from './welcome/news/news-overview/news-overview.component';
import { NewsComponent } from './welcome/news/news.component';
import { RegistrationOverviewComponent } from './welcome/registration/registration-overview/registration-overview.component';
import { RegistrationComponent } from './welcome/registration/registration.component';

/**
 * Make sure to add back CanActivate on Home
 */
const routes: Routes = [
  // Unauthenticated Routes
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'home',
            component: HomeOverviewComponent,
          },
        ],
      },
      {
        path: '',
        component: RegistrationComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'register',
            component: RegistrationOverviewComponent,
          },
        ],
      },
      {
        path: '',
        component: NewsComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'news',
            component: NewsOverviewComponent,
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
        component: ContactComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'contact',
            component: ContactOverviewComponent,
          },
        ],
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
    path: 'dashboard',
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
