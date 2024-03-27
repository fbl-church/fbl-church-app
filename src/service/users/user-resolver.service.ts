import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUserById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
