import { ChurchGroup, Relationship, WebRole } from './common.model';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  webRole?: WebRole[] | any[];
  password?: string;
  lastLoginDate?: Date;
  insertDate?: Date;
  [key: string]: any;
}

export interface Child extends User {
  cuid?: string;
  churchGroup?: ChurchGroup[] | any[];
  birthday?: Date | any;
  allergies?: string;
  additionalInfo?: string;
  guardians?: Guardian[];
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
