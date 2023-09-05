import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faChartSimple,
  faChildren,
  faCircleInfo,
  faHome,
  faLock,
  faPerson,
  faSchool,
  faSeedling,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const NAVIGATION_ROUTES = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: faHome,
    route: '/dashboard',
  },
  {
    id: 'access-manager',
    name: 'Access Manager',
    icon: faLock,
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
    icon: faSeedling,
    submenu: {
      id: 'juniorChurchDropdown',
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
    icon: faUsers,
  },
  {
    id: 'vbs',
    name: 'VBS',
    route: '/vbs',
    icon: faSchool,
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
    id: 'children',
    name: 'Children',
    icon: faChildren,
    route: '/children',
  },
  {
    id: 'gurdians',
    name: 'Gurdians',
    icon: faPerson,
    route: '/gurdians',
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: faChartSimple,
    route: '/reports',
  },
  {
    id: 'about',
    name: 'About',
    icon: faCircleInfo,
    route: '/about',
  },
  {
    id: 'repositories',
    name: 'Repositories',
    icon: faGithub,
    route: '/repositories',
  },
];
