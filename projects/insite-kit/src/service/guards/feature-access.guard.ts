import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, filter, forkJoin, map, take } from 'rxjs';
import { UserAccessService } from '../auth/user-access.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly userAccessService: UserAccessService
  ) {}

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
        this.userAccessService.user$.pipe(
          filter((u) => !!u),
          map((ua) => ua.hasFeature(d.app, d.feature, d.access)),
          take(1)
        )
      )
    ).pipe(
      map((v: any) => {
        if (!v.includes(false)) {
          return true;
        } else if (this.router.routerState.snapshot.url === '') {
          this.router.navigate(['/profile']);
        }
        return false;
      })
    );
  }
}
