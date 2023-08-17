import { ChurchGroup, Relationship } from './common.model';
import { User } from './user.model';

export interface Child extends User {
  cuid?: string;
  churchGroup?: ChurchGroup[] | any[];
  birthday?: Date | any;
  allergies?: string;
  additionalInfo?: string;
  gurdians?: Gurdian;
}

export interface Gurdian {
  id?: number;
  firstName?: string;
  lastName?: string;
  relationship?: Relationship | any;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  [key: string]: any;
}
