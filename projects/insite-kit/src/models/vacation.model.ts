import { VacationStatus, WebRole } from './common.model';
import { User } from './user.model';

export interface Vacation {
  id?: number;
  userId?: number;
  fullName?: string;
  webRole?: WebRole;
  storeId?: string;
  notes?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  insertDate?: Date;
  status?: VacationStatus;
  userProfile?: User;
}
