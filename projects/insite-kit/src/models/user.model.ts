import { WebRole } from './common.model';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  webRole?: WebRole | any;
  appAccess?: boolean;
  password?: string;
  lastLoginDate?: Date;
  hireDate?: Date;
  insertDate?: Date;
  [key: string]: any;
}

export interface Application {
  id: number;
  name: string;
  access: boolean;
  enabled: boolean;
}
