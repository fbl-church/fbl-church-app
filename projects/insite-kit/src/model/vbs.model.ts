import { AttendanceRecord, ChildAttendance } from './attendance-record.model';
import { ChurchGroup } from './common.model';

export interface VBSTheme {
  id?: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  status?: VBSThemeStatus;
  money?: number;
  childrenAttended?: number;
  donation?: string;
  groups?: VBSThemeGroup[];
  points?: VBSPoint[];
  insertDate?: Date;
}

export interface VBSThemeGroup {
  vbsThemeId?: number;
  group?: ChurchGroup;
  name?: string;
}

export interface VBSChildAttendance extends ChildAttendance {
  points?: VBSChildPoint[];
}

export interface VBSChildPoint {
  childId?: number;
  vbsAttendanceId?: number;
  vbsPointId?: number;
  type?: string;
  displayName?: string;
  points?: number;
  vbsThemeId?: number;
  insertDate?: Date;
}

export interface VBSPoint {
  id?: number;
  type?: string;
  displayName?: string;
  points?: number;
  registrationOnly?: boolean;
  checkInApply?: boolean;
  vbsThemeId?: number;
  updatedUserId?: number;
  updatedDate?: Date;
  insertUserId?: number;
  insertDate?: Date;
}

export interface VBSAttendanceRecord extends AttendanceRecord {
  vbsThemeId?: number;
  money?: number;
  spiritTheme?: string;
  offeringWinners?: ChurchGroup[];
}

export enum VBSThemeStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}
