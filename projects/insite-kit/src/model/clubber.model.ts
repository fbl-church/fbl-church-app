import { ChurchGroup } from './common.model';

export interface Clubber {
  id?: number;
  firstName?: string;
  lastName?: string;
  churchGroup?: ChurchGroup | any;
  birthday?: Date | any;
  allergies?: string;
  additionalInfo?: string;
  parent?: Parent;
  insertDate?: Date;
  [key: string]: any;
}

export interface Parent {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
