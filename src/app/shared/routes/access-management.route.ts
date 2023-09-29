import { Route } from '@angular/router';
import { AppAccessGuard } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AuthGuard } from 'projects/insite-kit/src/service/guards/auth.guard';
import { AccessManagerApplicationsComponent } from 'src/app/pages/access-manager/access-manager-applications/access-manager-applications.component';
import { ApplicationDetailComponent } from 'src/app/pages/access-manager/access-manager-applications/application-detail/application-detail.component';
import { AccessManagerFeaturesComponent } from 'src/app/pages/access-manager/access-manager-features/access-manager-features.component';
import { FeatureDetailComponent } from 'src/app/pages/access-manager/access-manager-features/feature-detail/feature-detail.component';
import { AccessManagerComponent } from 'src/app/pages/access-manager/access-manager.component';
import { ApplicationResolverService } from 'src/service/access-manager/application-resolver.service';
import { FeatureResolverService } from 'src/service/access-manager/feature-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const ACCESS_MANAGEMENT_ROUTE: Route = {
  path: 'access-manager',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, AppAccessGuard],
  children: [
    {
      path: '',
      component: AccessManagerComponent,
      pathMatch: 'full',
    },
    {
      path: 'applications',
      component: AccessManagerApplicationsComponent,
    },
    {
      path: 'applications/:id/details',
      component: ApplicationDetailComponent,
      resolve: { application: ApplicationResolverService },
    },
    {
      path: 'features',
      component: AccessManagerFeaturesComponent,
    },

    {
      path: 'features/:id/details',
      component: FeatureDetailComponent,
      resolve: {
        feature: FeatureResolverService,
      },
    },
  ],
};
