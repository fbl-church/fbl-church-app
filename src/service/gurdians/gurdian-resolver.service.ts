import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GurdianService } from './gurdian.service';

@Injectable({
  providedIn: 'root',
})
export class GurdianResolverService implements Resolve<Gurdian> {
  constructor(private gurdianService: GurdianService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Gurdian> {
    return this.gurdianService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
