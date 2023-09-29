import { Route } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { CreateGuardianComponent } from 'src/app/pages/guardians/create-guardian/create-guardian.component';
import { ExistingUserGuardianComponent } from 'src/app/pages/guardians/create-guardian/existing-user-guardian/existing-user-guardian.component';
import { GuardianDetailComponent } from 'src/app/pages/guardians/guardian-detail/guardian-detail.component';
import { EditGuardianComponent } from 'src/app/pages/guardians/guardian-detail/pages/edit-guardian/edit-guardian.component';
import { GuardianComponent } from 'src/app/pages/guardians/guardian.component';
import { GuardianResolverService } from 'src/service/guardians/guardian-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const GUARDIANS_ROUTE: Route = {
  path: 'guardians',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, AppAccessGuard, FeatureAccessGuard],
  data: {
    featureAccessGuards: [
      {
        app: App.GUARDIANS,
        feature: FeatureType.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      component: GuardianComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      component: CreateGuardianComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.GUARDIANS,
            feature: FeatureType.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: 'create/existing-user',
      component: ExistingUserGuardianComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.GUARDIANS,
            feature: FeatureType.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      component: GuardianDetailComponent,
      canActivate: [FeatureAccessGuard],
      resolve: { guardian: GuardianResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.GUARDIANS,
            feature: FeatureType.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: ':id/details/edit',
      canActivate: [FeatureAccessGuard],
      component: EditGuardianComponent,
      resolve: { guardian: GuardianResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.GUARDIANS,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
