import { Route } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { AuthGuard } from 'projects/insite-kit/src/service/auth/auth.guard';
import { FeatureAccessGuard } from 'projects/insite-kit/src/service/auth/feature-access.guard';
import { ChildDetailComponent } from 'src/app/pages/children/child-detail/child-detail.component';
import { EditChildGroupsComponent } from 'src/app/pages/children/child-detail/pages/edit-child-groups/edit-child-groups.component';
import { EditChildGurdiansComponent } from 'src/app/pages/children/child-detail/pages/edit-child-gurdians/edit-child-gurdians.component';
import { EditChildComponent } from 'src/app/pages/children/child-detail/pages/edit-child/edit-child.component';
import { ChildrenComponent } from 'src/app/pages/children/children.component';
import { CreateChildComponent } from 'src/app/pages/children/create-child/create-child.component';
import { ChildGroupsResolverService } from 'src/service/children/child-groups-resolver.service';
import { ChildGurdiansResolverService } from 'src/service/children/child-gurdians-resolver.service';
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
        feature: Feature.OVERVIEW,
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
            feature: Feature.DETAIL,
            access: Access.CREATE,
          },
        ],
      },
    },
    {
      path: ':id/details',
      component: ChildDetailComponent,
      canActivate: [FeatureAccessGuard],
      data: {
        featureAccessGuards: [
          {
            app: App.CHILDREN,
            feature: Feature.DETAIL,
            access: Access.READ,
          },
        ],
      },
    },
    {
      path: ':id/details/edit',
      canActivate: [FeatureAccessGuard],
      component: EditChildComponent,
      resolve: { user: ChildResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.CHILDREN,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/gurdians/edit',
      canActivate: [FeatureAccessGuard],
      component: EditChildGurdiansComponent,
      resolve: { gurdians: ChildGurdiansResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.CHILDREN,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
    {
      path: ':id/details/groups/edit',
      canActivate: [FeatureAccessGuard],
      component: EditChildGroupsComponent,
      resolve: { child: ChildGroupsResolverService },
      data: {
        featureAccessGuards: [
          {
            app: App.CHILDREN,
            feature: Feature.DETAIL,
            access: Access.UPDATE,
          },
        ],
      },
    },
  ],
};
