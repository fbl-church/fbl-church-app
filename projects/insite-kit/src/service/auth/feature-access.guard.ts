import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, forkJoin, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureAccessGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Determine if the current user JWT token is valid. If the token is invalid or expired
   * then it will return false, otherwise true.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return forkJoin(
      next.data.featureAccessGuards.map((d) =>
        this.authService.hasAccess(d.app, d.feature, d.access).pipe(take(1))
      )
    ).pipe(
      map((v: any) => {
        if (!v.includes(false)) {
          return true;
        } else if (this.router.routerState.snapshot.url === '') {
          this.router.navigate(['/home']);
          return false;
        } else {
          return false;
        }
      })
    );
  }
}
