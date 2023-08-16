import { Route } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { CreateGurdianComponent } from 'src/app/pages/gurdians/create-gurdian/create-gurdian.component';
import { ExistingUserGurdianComponent } from 'src/app/pages/gurdians/create-gurdian/existing-user-gurdian/existing-user-gurdian.component';
import { GurdianDetailComponent } from 'src/app/pages/gurdians/gurdian-detail/gurdian-detail.component';
import { EditGurdianComponent } from 'src/app/pages/gurdians/gurdian-detail/pages/edit-gurdian/edit-gurdian.component';
import { GurdianComponent } from 'src/app/pages/gurdians/gurdian.component';
import { GurdianResolverService } from 'src/service/gurdians/gurdian-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const GURDIANS_ROUTE: Route = {
  path: 'gurdians',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: GurdianComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      component: CreateGurdianComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.GURDIANS,
            feature: Feature.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'create/existing-user',
      component: ExistingUserGurdianComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.GURDIANS,
            feature: Feature.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      component: GurdianDetailComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.GURDIANS,
            feature: Feature.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: ':id/details/edit',
      canActivate: [FeatureAccessGuard],
      component: EditGurdianComponent,
      resolve: { gurdian: GurdianResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.GURDIANS,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
