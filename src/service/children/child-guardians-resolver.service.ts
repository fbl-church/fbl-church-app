import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GuardianService } from '../guardians/guardian.service';

@Injectable({
  providedIn: 'root',
})
export class ChildGuardiansResolverService  {
  constructor(private guardianService: GuardianService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.guardianService.getGuardiansByChildId(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
