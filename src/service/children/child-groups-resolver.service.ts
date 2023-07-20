import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChildrenService } from './children.service';

@Injectable({
  providedIn: 'root',
})
export class ChildGroupsResolverService implements Resolve<any> {
  constructor(private childrenService: ChildrenService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.childrenService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
