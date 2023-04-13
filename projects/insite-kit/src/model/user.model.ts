import { WebRole } from './common.model';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  webRole?: WebRole | any;
  password?: string;
  lastLoginDate?: Date;
  insertDate?: Date;
  [key: string]: any;
}
