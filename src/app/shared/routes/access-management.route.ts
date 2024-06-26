import { Route } from '@angular/router';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { RouteDataResolver } from 'projects/insite-kit/src/service/request/route-data.resolver';
import { AccessManagerApplicationsComponent } from 'src/app/pages/access-manager/access-manager-applications/access-manager-applications.component';
import { ApplicationDetailComponent } from 'src/app/pages/access-manager/access-manager-applications/application-detail/application-detail.component';
import { AccessManagerDeletedUsersComponent } from 'src/app/pages/access-manager/access-manager-deleted-users/access-manager-deleted-users.component';
import { DeletedUsersDetailComponent } from 'src/app/pages/access-manager/access-manager-deleted-users/deleted-users-detail/deleted-users-detail.component';
import { AccessManagerFeaturesComponent } from 'src/app/pages/access-manager/access-manager-features/access-manager-features.component';
import { FeatureDetailComponent } from 'src/app/pages/access-manager/access-manager-features/feature-detail/feature-detail.component';
import { ApplicationService } from 'src/service/access-manager/application.service';
import { FeatureService } from 'src/service/access-manager/feature.service';
import { UserService } from 'src/service/users/user.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const ACCESS_MANAGEMENT_ROUTE: Route = {
  path: 'access-manager',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD],
  children: [
    {
      path: '',
      redirectTo: 'applications',
      pathMatch: 'full',
    },
    {
      path: 'applications',
      component: AccessManagerApplicationsComponent,
    },
    {
      path: 'applications/:id/details',
      component: ApplicationDetailComponent,
      resolve: { application: RouteDataResolver.for(ApplicationService) },
    },
    {
      path: 'features',
      component: AccessManagerFeaturesComponent,
    },
    {
      path: 'features/:id/details',
      component: FeatureDetailComponent,
      resolve: {
        feature: RouteDataResolver.for(FeatureService),
      },
    },
    {
      path: 'deleted/users',
      component: AccessManagerDeletedUsersComponent,
    },
    {
      path: 'deleted/users/:id/details',
      component: DeletedUsersDetailComponent,
      resolve: { user: RouteDataResolver.for(UserService) },
    },
  ],
};
