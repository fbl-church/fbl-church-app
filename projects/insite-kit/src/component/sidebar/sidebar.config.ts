import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faChartSimple,
  faChildren,
  faCircleInfo,
  faFileCircleCheck,
  faHome,
  faPerson,
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
    id: 'check-in',
    name: 'Check In',
    route: '/check-in',
    icon: faFileCircleCheck,
    submenu: {
      id: 'checkInDropdown',
      items: [
        {
          id: 'nursery',
          name: 'Nursery',
          route: '/nursery',
        },
        {
          id: 'junior-church',
          name: 'Junior Church',
          route: '/junior-church',
        },
        {
          id: 'awana',
          name: 'Awana',
          route: '/awana',
        },
        {
          id: 'vbs',
          name: 'VBS',
          route: '/vbs',
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
