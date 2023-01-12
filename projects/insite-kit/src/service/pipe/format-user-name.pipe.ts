import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/user.model';

@Pipe({ name: 'formatUserName' })
export class UsernamePipe implements PipeTransform {
  transform(user: User) {
    if (user) {
      if (user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      } else {
        return user.firstName;
      }
    } else {
      return '-';
    }
  }
}
