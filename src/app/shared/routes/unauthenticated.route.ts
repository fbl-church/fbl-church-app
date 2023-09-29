import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { LoginOverviewComponent } from 'src/app/pages/login/login-overview/login-overview.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const UNAUTHENTICATED_ROUTE: Route = {
  path: '',
  component: LoginComponent,
  children: [
    {
      path: 'login',
      canActivate: [AuthGuard],
      component: LoginOverviewComponent,
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ],
};
