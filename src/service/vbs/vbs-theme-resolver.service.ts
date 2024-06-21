import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VBSThemesService } from './vbs-themes.service';

@Injectable({
  providedIn: 'root',
})
export class VBSThemeResolverService {
  constructor(private vbsThemeService: VBSThemesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.vbsThemeService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
