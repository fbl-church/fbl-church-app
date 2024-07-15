import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Access, App, FeatureType } from '../../model/common.model';

export interface NavItem extends NavItemDetails {
  submenu?: {
    id: string;
    items: NavItem[];
  };
}

export interface NavItemDetails {
  id: string;
  name: string;
  icon?: IconName;
  route: string;
  restriction?: FeatureRestriction;
}

export interface FeatureRestriction {
  app: App;
  feature?: FeatureType;
  access?: Access;
}

export const NAVIGATION_ROUTES: NavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'home',
    route: '/dashboard',
  },
  {
    id: 'access-manager',
    name: 'Access Manager',
    icon: 'lock',
    route: '/access-manager',
    submenu: {
      id: 'accessManagerDropdown',
      items: [
        {
          id: 'applications',
          name: 'Applications',
          route: '/applications',
        },
        {
          id: 'features',
          name: 'Features',
          route: '/features',
        },
        {
          id: 'deleted-accounts',
          name: 'Deleted Accounts',
          route: '/deleted',
          submenu: {
            id: 'deletedAccountsDropdown',
            items: [
              {
                id: 'deleted-users',
                name: 'Users',
                route: '/users',
              },
              {
                id: 'deleted-children',
                name: 'Children',
                route: '/children',
              },
              {
                id: 'deleted-guardians',
                name: 'Guardians',
                route: '/guardians',
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: 'junior-church',
    name: 'Junior Church',
    route: '/junior-church',
    icon: 'seedling',
    restriction: {
      app: App.JUNIOR_CHURCH,
    },
    submenu: {
      id: 'juniorChurchDropdown',
      items: [
        {
          id: 'registration',
          name: 'Registration',
          route: '/registration',
          restriction: {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.REGISTRATION,
            access: Access.CREATE,
          },
        },
        {
          id: 'check-in',
          name: 'Check In',
          route: '/check-in',
          restriction: {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.CHECK_IN_OVERVIEW,
            access: Access.READ,
          },
        },
        {
          id: 'lessons',
          name: 'Lessons',
          route: '/lessons',
          restriction: {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.LESSONS,
            access: Access.READ,
          },
        },
        {
          id: 'children',
          name: 'Children',
          route: '/children',
        },
        {
          id: 'workers',
          name: 'Workers',
          route: '/workers',
          restriction: {
            app: App.JUNIOR_CHURCH,
            feature: FeatureType.WORKERS,
            access: Access.READ,
          },
        },
      ],
    },
  },
  {
    id: 'nursery',
    name: 'Nursery',
    route: '/nursery',
    icon: 'baby-carriage',
    restriction: {
      app: App.NURSERY,
    },
    submenu: {
      id: 'nurseryDropdown',
      items: [
        {
          id: 'registration',
          name: 'Registration',
          route: '/registration',
          restriction: {
            app: App.NURSERY,
            feature: FeatureType.REGISTRATION,
            access: Access.CREATE,
          },
        },
        {
          id: 'check-in',
          name: 'Check In',
          route: '/check-in',
          restriction: {
            app: App.NURSERY,
            feature: FeatureType.CHECK_IN_CHILDREN,
            access: Access.READ,
          },
        },
        {
          id: 'children',
          name: 'Children',
          route: '/children',
          restriction: {
            app: App.NURSERY,
            feature: FeatureType.CHILDREN,
            access: Access.READ,
          },
        },
        {
          id: 'workers',
          name: 'Workers',
          route: '/workers',
          restriction: {
            app: App.NURSERY,
            feature: FeatureType.WORKERS,
            access: Access.READ,
          },
        },
      ],
    },
  },
  {
    id: 'awana',
    name: 'AWANA',
    route: '/awana',
    icon: 'church',
    submenu: {
      id: 'awanaDropdown',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          route: '/dashboard',
        },
        {
          id: 'registration',
          name: 'Registration',
          route: '/registration',
        },
        {
          id: 'check-in',
          name: 'Check In',
          route: '/check-in',
          restriction: {
            app: App.AWANA,
            feature: FeatureType.CHECK_IN_OVERVIEW,
            access: Access.READ,
          },
        },
        {
          id: 'children',
          name: 'Children',
          route: '/children',
        },
        {
          id: 'workers',
          name: 'Workers',
          route: '/workers',
          restriction: {
            app: App.AWANA,
            feature: FeatureType.WORKERS,
            access: Access.READ,
          },
        },
        {
          id: 'grand-prix',
          name: 'Grand Prix',
          route: '/grand-prix',
          restriction: {
            app: App.AWANA,
            feature: FeatureType.GRAND_PRIX,
            access: Access.READ,
          },
        },
      ],
    },
  },
  {
    id: 'vbs',
    name: 'VBS',
    route: '/vbs',
    icon: 'school',
    restriction: {
      app: App.VBS,
    },
    submenu: {
      id: 'vbsDropdown',
      items: [
        {
          id: 'themes',
          name: 'Themes',
          route: '/themes',
          restriction: {
            app: App.VBS,
            feature: FeatureType.THEMES,
            access: Access.READ,
          },
        },
        {
          id: 'registration',
          name: 'Registration',
          route: '/registration',
          restriction: {
            app: App.VBS,
            feature: FeatureType.REGISTRATION,
            access: Access.READ,
          },
        },
        {
          id: 'groups',
          name: 'Groups',
          route: '/groups',
          restriction: {
            app: App.VBS,
            feature: FeatureType.GROUPS,
            access: Access.READ,
          },
          submenu: {
            id: 'vbsGroupsDropdown',
            items: [
              {
                id: 'pre-primary',
                name: 'Pre-Primary',
                route: '/pre-primary',
                restriction: {
                  app: App.VBS,
                  feature: FeatureType.GROUPS_VBS_PRE_PRIMARY,
                  access: Access.READ,
                },
              },
              {
                id: 'primary',
                name: 'Primary',
                route: '/primary',
                restriction: {
                  app: App.VBS,
                  feature: FeatureType.GROUPS_VBS_PRIMARY,
                  access: Access.READ,
                },
              },
              {
                id: 'middler',
                name: 'Middler',
                route: '/middler',
                restriction: {
                  app: App.VBS,
                  feature: FeatureType.GROUPS_VBS_MIDDLER,
                  access: Access.READ,
                },
              },
              {
                id: 'junior',
                name: 'Junior',
                route: '/junior',
                restriction: {
                  app: App.VBS,
                  feature: FeatureType.GROUPS_VBS_JUNIOR,
                  access: Access.READ,
                },
              },
            ],
          },
        },
        {
          id: 'children',
          name: 'Children',
          route: '/children',
        },
      ],
    },
  },
  {
    id: 'users',
    name: 'Users',
    route: '/users',
    icon: 'users',
    restriction: {
      app: App.USERS,
    },
  },
  {
    id: 'children',
    name: 'Children',
    icon: 'children',
    route: '/children',
    restriction: {
      app: App.CHILDREN,
    },
  },
  {
    id: 'guardians',
    name: 'Guardians',
    icon: 'person',
    route: '/guardians',
    restriction: {
      app: App.GUARDIANS,
    },
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: 'chart-simple',
    route: '/reports',
  },
  {
    id: 'about',
    name: 'About',
    icon: 'circle-info',
    route: '/about',
  },
];
