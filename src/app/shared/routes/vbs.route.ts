import { Route } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { VBSRegistrationComponent } from 'src/app/pages/vbs/vbs-registration.component';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const VBS_ROUTE: Route = {
  path: 'vbs',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, AppAccessGuard, FeatureAccessGuard],
  data: {
    featureAccessGuards: [
      {
        app: App.VBS,
        feature: FeatureType.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      component: VBSRegistrationComponent,
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: VBSRegistrationComponent,
      pathMatch: 'full',
    },
    {
      path: 'registration',
      component: VBSRegistrationComponent,
    },
    {
      path: 'groups',
      component: VBSRegistrationComponent,
    },
  ],
};
