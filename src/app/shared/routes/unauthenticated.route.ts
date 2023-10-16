import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
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
      canActivate: [AuthGuard],
      component: LoginOverviewComponent,
    },
    {
      path: 'forgot-password',
      canActivate: [AuthGuard],
      component: ForgotPasswordComponent,
    },
    {
      path: 'reset-password/:id',
      canActivate: [AuthGuard],
      component: ResetPasswordComponent,
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ],
};
