import { Route } from '@angular/router';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { ForgotPasswordComponent } from 'src/app/pages/login/forgot-password/forgot-password.component';
import { LoginOverviewComponent } from 'src/app/pages/login/login-overview/login-overview.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ResetPasswordComponent } from 'src/app/pages/login/reset-password/reset-password.component';

export const UNAUTHENTICATED_ROUTE: Route = {
  path: '',
  component: LoginComponent,
  children: [
    {
      path: 'login',
      canActivate: [AUTH_GUARD],
      component: LoginOverviewComponent,
    },
    {
      path: 'forgot-password',
      canActivate: [AUTH_GUARD],
      component: ForgotPasswordComponent,
    },
    {
      path: 'reset-password/:id',
      canActivate: [AUTH_GUARD],
      component: ResetPasswordComponent,
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ],
};
