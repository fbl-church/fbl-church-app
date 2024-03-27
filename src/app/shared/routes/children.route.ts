import { Route } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { APP_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/app-access.guard';
import { AUTH_GUARD } from 'projects/insite-kit/src/service/guards/auth.guard';
import { FEATURE_ACCESS_GUARD } from 'projects/insite-kit/src/service/guards/feature-access.guard';
import { ChildDetailComponent } from 'src/app/pages/children/child-detail/child-detail.component';
import { EditChildGuardiansComponent } from 'src/app/pages/children/child-detail/pages/edit-child-guardians/edit-child-guardians.component';
import { EditChildComponent } from 'src/app/pages/children/child-detail/pages/edit-child/edit-child.component';
import { ChildrenComponent } from 'src/app/pages/children/children.component';
import { CreateChildComponent } from 'src/app/pages/children/create-child/create-child.component';
import { ChildGuardiansResolverService } from 'src/service/children/child-guardians-resolver.service';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const CHILDREN_ROUTE: Route = {
  path: 'children',
  component: AuthenticatedLayoutComponent,
  canActivate: [AUTH_GUARD, APP_ACCESS_GUARD, FEATURE_ACCESS_GUARD],
  data: {
    FEATURE_ACCESS_GUARDs: [
      {
        app: App.CHILDREN,
        feature: FeatureType.OVERVIEW,
        access: Access.READ,
      },
    ],
  },
  children: [
    {
      path: '',
      component: ChildrenComponent,
      pathMatch: 'full',
    },
    {
      path: 'create',
      component: CreateChildComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.CHILDREN,
            feature: FeatureType.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      component: ChildDetailComponent,
      canActivate: [FEATURE_ACCESS_GUARD],
      resolve: { child: ChildResolverService },
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.CHILDREN,
            feature: FeatureType.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: ':id/details/edit',
      canActivate: [FEATURE_ACCESS_GUARD],
      component: EditChildComponent,
      resolve: { child: ChildResolverService },
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.CHILDREN,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/guardians/edit',
      canActivate: [FEATURE_ACCESS_GUARD],
      component: EditChildGuardiansComponent,
      resolve: { guardians: ChildGuardiansResolverService },
      data: {
        FEATURE_ACCESS_GUARDs: [
          {
            app: App.CHILDREN,
            feature: FeatureType.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
