import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeatureService } from './feature.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureResolverService  {
  constructor(private readonly featureService: FeatureService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.featureService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
