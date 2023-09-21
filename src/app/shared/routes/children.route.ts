import { Route } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { ChildDetailComponent } from 'src/app/pages/children/child-detail/child-detail.component';
import { EditChildGuardiansComponent } from 'src/app/pages/children/child-detail/pages/edit-child-guardians/edit-child-gurdians.component';
import { EditChildComponent } from 'src/app/pages/children/child-detail/pages/edit-child/edit-child.component';
import { ChildrenComponent } from 'src/app/pages/children/children.component';
import { CreateChildComponent } from 'src/app/pages/children/create-child/create-child.component';
import { ChildGuardiansResolverService } from 'src/service/children/child-guardians-resolver.service';
import { ChildResolverService } from 'src/service/children/child-resolver.service';
import { AuthenticatedLayoutComponent } from '../components/layouts/authenticated-layout/authenticated-layout.component';

export const CHILDREN_ROUTE: Route = {
  path: 'children',
  component: AuthenticatedLayoutComponent,
  canActivate: [AuthGuard, FeatureAccessGuard],
  data: {
    featureAccessGuards: [
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
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
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
      canActivate: [FeatureAccessGuard],
      resolve: { child: ChildResolverService },
      data: {
        featureAccessGuards: [
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
      canActivate: [FeatureAccessGuard],
      component: EditChildComponent,
      resolve: { child: ChildResolverService },
      data: {
        featureAccessGuards: [
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
      canActivate: [FeatureAccessGuard],
      component: EditChildGuardiansComponent,
      resolve: { guardians: ChildGuardiansResolverService },
      data: {
        featureAccessGuards: [
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
