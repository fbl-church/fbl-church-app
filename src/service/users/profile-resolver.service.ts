import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<any> {
  constructor(private userService: UserService) {}
  resolve(): Observable<User> {
    return this.userService.getCurrentUser().pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
