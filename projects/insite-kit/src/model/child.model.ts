import { ChurchGroup, Relationship } from './common.model';

export interface Child {
  id?: number;
  firstName?: string;
  lastName?: string;
  churchGroup?: ChurchGroup[] | any[];
  birthday?: Date | any;
  allergies?: string;
  additionalInfo?: string;
  gurdians?: Gurdian;
  insertDate?: Date;
  [key: string]: any;
}

export interface Gurdian {
  id?: number;
  firstName?: string;
  lastName?: string;
  relationship?: Relationship | any;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: any;
}
