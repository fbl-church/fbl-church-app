import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GuardianService } from './guardian.service';

@Injectable({
  providedIn: 'root',
})
export class GuardianResolverService {
  constructor(private guardianService: GuardianService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Guardian> {
    return this.guardianService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
