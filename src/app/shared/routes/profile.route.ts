import { Route } from '@angular/router';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { ProfileEditComponent } from 'src/app/pages/profile/profile-edit/profile-edit.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { UpdatePasswordComponent } from 'src/app/pages/profile/update-password/update-password.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const PROFILE_ROUTE: Route = {
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
};
