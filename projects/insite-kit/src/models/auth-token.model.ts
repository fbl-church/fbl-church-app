import { User } from './user.model';

export interface AuthToken {
  token: string;
  createDate: Date | string;
  expireDate: Date | string;
  user: User;
}
