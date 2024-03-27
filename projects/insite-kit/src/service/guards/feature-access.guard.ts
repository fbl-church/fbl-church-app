import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Observable, filter, forkJoin, map, take } from 'rxjs';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

export const FEATURE_ACCESS_GUARD: CanActivateFn = (route) => inject(FeatureAccessGuard).canActivate(route);

@Injectable({
  providedIn: 'root',
})
class FeatureAccessGuard {
  constructor(
    private readonly navigationService: NavigationService,
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
      next.data.FEATURE_ACCESS_GUARDs.map((d) =>
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
        } else if (this.navigationService.routerUrl() === '') {
          this.navigationService.navigate('/profile');
        }
        return false;
      })
    );
  }
}
