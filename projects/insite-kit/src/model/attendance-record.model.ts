import { ChurchGroup } from './common.model';
import { User } from './user.model';

export interface AttendanceRecord {
  id?: number;
  name?: string;
  status?: AttendanceStatus;
  type?: ChurchGroup;
  workers?: User[] | any[];
  activeDate?: Date | any;
  closedDate?: Date | any;
  startedByUserId?: any;
  closedByUserId?: any;
  insertDate?: Date | any;
  [key: string]: any;
}

export interface ChildAttendance {
  id?: number;
  attendanceRecordId?: number;
  firstName?: string;
  lastName?: string;
  notes?: string;
  cuid?: string;
  updatedUserId?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  recordName?: string;
  recordType?: ChurchGroup;
  recordDate?: Date;
  [key: string]: any;
}

export enum AttendanceStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  FINALIZED = 'FINALIZED',
}
