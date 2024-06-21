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

export interface VBSPoint {
  id?: number;
  type?: string;
  displayName?: string;
  points?: number;
  vbsThemeId?: number;
  updatedUserId?: number;
  updatedDate?: Date;
  insertUserId?: number;
  insertDate?: Date;
}

export enum VBSThemeStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}
