import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Access, App, FeatureType } from '../../model/common.model';

export interface NavItem extends NavItemDetails {
  submenu?: {
    id: string;
    items: NavItemDetails[];
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
  feature: FeatureType;
  access: Access;
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
      feature: FeatureType.OVERVIEW,
      access: Access.READ,
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
            feature: FeatureType.CHECK_IN,
            access: Access.READ,
          },
        },
        {
          id: 'lessons',
          name: 'Lessons',
          route: '/lessons',
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
      feature: FeatureType.OVERVIEW,
      access: Access.READ,
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
            feature: FeatureType.CHECK_IN,
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
          id: 'registration',
          name: 'Registration',
          route: '/registration',
        },
        {
          id: 'check-in',
          name: 'Check In',
          route: '/check-in',
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
        },
      ],
    },
  },
  {
    id: 'vbs',
    name: 'VBS',
    route: '/vbs',
    icon: 'school',
    submenu: {
      id: 'vbsDropdown',
      items: [
        {
          id: 'home',
          name: 'Home',
          route: '/home',
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
        },
        {
          id: 'groups',
          name: 'Groups',
          route: '/groups',
        },
        {
          id: 'workers',
          name: 'Workers',
          route: '/workers',
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
      feature: FeatureType.OVERVIEW,
      access: Access.READ,
    },
  },
  {
    id: 'children',
    name: 'Children',
    icon: 'children',
    route: '/children',
    restriction: {
      app: App.CHILDREN,
      feature: FeatureType.OVERVIEW,
      access: Access.READ,
    },
  },
  {
    id: 'guardians',
    name: 'Guardians',
    icon: 'person',
    route: '/guardians',
    restriction: {
      app: App.GUARDIANS,
      feature: FeatureType.OVERVIEW,
      access: Access.READ,
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
