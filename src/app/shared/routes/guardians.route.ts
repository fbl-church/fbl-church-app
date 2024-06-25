import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { CreateGuardianComponent } from 'src/app/pages/guardians/create-guardian/create-guardian.component';
import { ExistingUserGuardianComponent } from 'src/app/pages/guardians/create-guardian/existing-user-guardian/existing-user-guardian.component';
import { GuardianDetailComponent } from 'src/app/pages/guardians/guardian-detail/guardian-detail.component';
import { EditGuardianComponent } from 'src/app/pages/guardians/guardian-detail/pages/edit-guardian/edit-guardian.component';
import { GuardianComponent } from 'src/app/pages/guardians/guardian.component';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const GUARDIANS_ROUTE: Route = {
  path: 'guardians',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      component: GuardianComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      component: CreateGuardianComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
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
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDS: [
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
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { guardian: RouteDataResolver.for(GuardianService) },
      data: {
        FEATURE_ACCESS_GUARDS: [
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
      canActivate: [FEATURE_ACCESS_GUARD],
      component: EditGuardianComponent,
      resolve: { guardian: RouteDataResolver.for(GuardianService) },
      data: {
        FEATURE_ACCESS_GUARDS: [
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
