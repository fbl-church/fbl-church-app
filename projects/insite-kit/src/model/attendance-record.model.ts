import { ChurchGroup } from './common.model';
import { User } from './user.model';

export interface AttendanceRecord {
  id?: number;
  name?: string;
  status?: AttendanceStatus;
  type?: ChurchGroup;
  workers?: User[] | any[];
  activeDate?: Date;
  closedDate?: Date;
  insertDate?: Date;
  [key: string]: any;
}

export enum AttendanceStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  FINALIZED = 'FINALIZED',
}
