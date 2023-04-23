import { ChurchGroup, Relationship } from './common.model';

export interface Clubber {
  id?: number;
  firstName?: string;
  lastName?: string;
  churchGroup?: ChurchGroup | any;
  birthday?: Date | any;
  allergies?: string;
  additionalInfo?: string;
  gurdians?: Gurdian;
  gurdianIds?: number[];
  insertDate?: Date;
  [key: string]: any;
}

export interface Gurdian {
  firstName?: string;
  lastName?: string;
  relationship?: Relationship | any;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: any;
}
