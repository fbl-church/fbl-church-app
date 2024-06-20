import { Route } from '@angular/router';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { VBSGroupsJuniorComponent } from 'src/app/pages/vbs/groups/junior/vbs-groups-junior.component';
import { VBSGroupsMiddlerComponent } from 'src/app/pages/vbs/groups/middler/vbs-groups-middler.component';
import { VBSGroupsPrePrimaryComponent } from 'src/app/pages/vbs/groups/pre-primary/vbs-groups-pre-primary.component';
import { VBSGroupsPrimaryComponent } from 'src/app/pages/vbs/groups/primary/vbs-groups-primary.component';
import { VBSThemesComponent } from 'src/app/pages/vbs/themes/vbs-themes.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'themes',
      component: VBSThemesComponent,
    },
    {
      path: 'registration',
      component: VBSThemesComponent,
    },
    {
      path: 'groups',
      children: [
        {
          path: 'pre-primary',
          component: VBSGroupsPrePrimaryComponent,
        },
        {
          path: 'primary',
          component: VBSGroupsPrimaryComponent,
        },
        {
          path: 'middler',
          component: VBSGroupsMiddlerComponent,
        },
        {
          path: 'junior',
          component: VBSGroupsJuniorComponent,
        },
      ],
    },
  ],
};
