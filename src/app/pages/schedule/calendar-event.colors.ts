import { EventColor } from 'calendar-utils';

export const CALENDAR_COLOR: Record<string, EventColor> = {
  ACTIVE: {
    primary: '#3cbe36',
    secondary: '#3cbe36',
  },
  PENDING: {
    primary: '#feb759',
    secondary: '#feb759',
  },
  CLOSED: {
    primary: '#e32323',
    secondary: '#e32323',
  },
  DEFAULT: {
    primary: '#666',
    secondary: '#666',
  },
};
