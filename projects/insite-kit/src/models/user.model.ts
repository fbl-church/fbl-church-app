import { WebRole } from './common.model';
import { Vacation } from './vacation.model';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  webRole?: WebRole | any;
  accountStatus?: UserStatus;
  appAccess?: boolean;
  password?: string;
  storeId?: string;
  storeName?: string;
  lastLoginDate?: Date;
  hireDate?: Date;
  insertDate?: Date;
  vacations?: Vacation[];
  [key: string]: any;
}

export interface Application {
  id: number;
  name: string;
  access: boolean;
  enabled: boolean;
}

export interface UserStatus {
  accountStatus: AccountStatus | any;
  appAccess: boolean;
  updatedUserId?: number;
}

export enum AccountStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
}
