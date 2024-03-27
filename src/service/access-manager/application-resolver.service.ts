import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationResolverService  {
  constructor(private applicationService: ApplicationService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.applicationService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
