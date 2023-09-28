import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { UserAccessService } from './user-access.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly UNAUTHENTICATED_ROUTES = ['login', 'register'];
  private readonly DEFAULT_APP_ROUTES = ['login', 'home', 'profile'];

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService,
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
    return combineLatest([this.validToken(next), this.hasAppAccess(next)]).pipe(
      map(([v, a]) => v && a)
    );
  }

  /**
   * Determine if the current user JWT token is valid. If the token is invalid or expired
   * then it will return false, otherwise true.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  validToken(next: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.jwt.isAuthenticated()) {
      if (!this.UNAUTHENTICATED_ROUTES.includes(next.routeConfig.path)) {
        this.router.navigate(['/login']);
        return of(false);
      }
    } else if (next.routeConfig.path === 'login') {
      this.router.navigate(['/profile']);
      return of(false);
    }
    return of(true);
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
    if (!access && this.router.routerState.snapshot.url === '') {
      this.router.navigate(['/profile']);
    }
    return access;
  }
}
