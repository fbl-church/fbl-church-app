import { AttendanceStatus } from './attendance-record.model';
import { ChurchGroup, Relationship, WebRole } from './common.model';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  webRole?: WebRole[] | any[];
  themeType?: ThemeType;
  appAccess?: boolean;
  accountStatus?: any;
  password?: string;
  lastLoginDate?: Date;
  insertDate?: Date;
  [key: string]: any;
}

export interface UserSchedule {
  recordId?: number;
  userId?: number;
  recordName?: string;
  status?: AttendanceStatus;
  type?: ChurchGroup;
  activeDate?: Date;
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  DENIED = 'DENIED',
}

export interface VBSRegistration {
  guardians?: Guardian[];
  children?: Child[];
}

export interface Child extends User {
  cuid?: string;
  churchGroup?: ChurchGroup[] | any[];
  birthday?: Date | any;
  allergies?: string[];
  additionalInfo?: string;
  guardians?: Guardian[];
  relationship?: Relationship | any;
  releaseOfLiability?: boolean;
}

export interface Guardian extends User {
  relationship?: Relationship | any;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface GrandPrixUser extends User {
  icon?: string;
}

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
