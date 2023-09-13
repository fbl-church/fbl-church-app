import { Route } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { WebRoleAccessGuard } from 'projects/insite-kit/src/service/auth/web-role-access.guard';
import { AccessManagerApplicationsComponent } from 'src/app/pages/access-manager/access-manager-applications/access-manager-applications.component';
import { ApplicationDetailComponent } from 'src/app/pages/access-manager/access-manager-applications/application-detail/application-detail.component';
import { AccessManagerComponent } from 'src/app/pages/access-manager/access-manager.component';
import { ApplicationResolverService } from 'src/service/access-manager/application-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const ACCESS_MANAGEMENT_ROUTE: Route = {
  path: 'access-manager',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, WebRoleAccessGuard],
  data: {
    roles: [WebRole.ADMINISTRATOR],
  },
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
  ],
};
