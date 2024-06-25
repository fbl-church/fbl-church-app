import { Route } from '@angular/router';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { VBSGroupsJuniorComponent } from 'src/app/pages/vbs/groups/junior/vbs-groups-junior.component';
import { VBSGroupsMiddlerComponent } from 'src/app/pages/vbs/groups/middler/vbs-groups-middler.component';
import { VBSGroupsPrePrimaryComponent } from 'src/app/pages/vbs/groups/pre-primary/vbs-groups-pre-primary.component';
import { VBSGroupsPrimaryComponent } from 'src/app/pages/vbs/groups/primary/vbs-groups-primary.component';
import { VBSCreateThemeComponent } from 'src/app/pages/vbs/themes/create-theme/vbs-create-theme.component';
import { VBSThemeDetailsComponent } from 'src/app/pages/vbs/themes/theme-details/vbs-theme-details.component';
import { VBSThemesComponent } from 'src/app/pages/vbs/themes/vbs-themes.component';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
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
      children: [
        {
          path: '',
          component: VBSThemesComponent,
        },
        {
          path: 'new',
          component: VBSCreateThemeComponent,
        },
        {
          path: ':id',
          component: VBSThemeDetailsComponent,
          resolve: { theme: RouteDataResolver.for(VBSThemesService) },
        },
      ],
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
