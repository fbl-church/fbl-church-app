import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

export const APP_ACCESS_GUARD: CanActivateFn = (route) => inject(AppAccessGuard).canActivate(route);

@Injectable({
  providedIn: 'root',
})
class AppAccessGuard {
  private readonly DEFAULT_APP_ROUTES = ['login', 'home', 'profile'];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly userAccessService: UserAccessService
  ) {}

  /**
   * Determine if the current authenticated user has access to the application
   * they are trying to route too.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasAppAccess(next);
  }

  /**
   * Determine if the user has application access.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  hasAppAccess(next: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.DEFAULT_APP_ROUTES.includes(next.routeConfig.path)) {
      return of(true);
    }

    return this.userAccessService.user$.pipe(
      map((ua) => ua.hasApp(next.routeConfig.path)),
      tap((access) => this.emptyRoute(access))
    );
  }

  /**
   * Checks to see if the user is accessing a route they can not see
   * and causes an empty route. THis will get them back on the route
   * tree to take them where they can access.
   *
   * @param access If the user has access to the application.
   * @param next The route snapshot
   * @returns If the user is able to see the route.
   */
  private emptyRoute(access: boolean): boolean {
    if (!access && this.navigationService.routerUrl() === '') {
      this.navigationService.navigate('/profile');
    }
    return access;
  }
}
