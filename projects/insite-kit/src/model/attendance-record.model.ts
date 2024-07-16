import { ChurchGroup } from './common.model';
import { Guardian, User } from './user.model';

export interface AttendanceRecord {
  id?: number;
  name?: string;
  status?: AttendanceStatus;
  type?: ChurchGroup | string;
  unitSession?: string;
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
  guardianPickedUpId?: number;
  guardianPickedUp?: Guardian;
  checkInDate?: Date;
  checkOutDate?: Date;
  recordName?: string;
  recordType?: ChurchGroup;
  status?: AttendanceStatus;
  recordDate?: Date;
  [key: string]: any;
}

export enum AttendanceStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  FINALIZED = 'FINALIZED',
}
