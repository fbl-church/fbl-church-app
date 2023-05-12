import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClubberService } from './clubber.service';

@Injectable({
  providedIn: 'root',
})
export class ClubberResolverService implements Resolve<any> {
  constructor(private clubberService: ClubberService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.clubberService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
