import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly UNAUTHENTICATED_ROUTES = ['login', 'register'];
  private readonly DEFAULT_APP_ROUTES = ['login', 'home', 'profile'];

  constructor(private router: Router, private jwt: JwtService) {}

  /**
   * Determine if the current user JWT token is valid. If the token is invalid or expired
   * then it will return false, otherwise true.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  canActivate(next: ActivatedRouteSnapshot): boolean {
    return this.validToken(next) && this.hasAppAccess(next);
  }

  /**
   * Determine if the current user JWT token is valid. If the token is invalid or expired
   * then it will return false, otherwise true.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  validToken(next: ActivatedRouteSnapshot): boolean {
    if (!this.jwt.isAuthenticated()) {
      if (!this.UNAUTHENTICATED_ROUTES.includes(next.routeConfig.path)) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if (next.routeConfig.path === 'login') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  /**
   * Determine if the user has application access.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  hasAppAccess(next: ActivatedRouteSnapshot): boolean {
    if (this.DEFAULT_APP_ROUTES.includes(next.routeConfig.path)) {
      return true;
    }

    const canAccessApp = this.jwt
      .getApps()
      .find((path) => path.includes(next.routeConfig.path));

    if (!canAccessApp && this.router.routerState.snapshot.url === '') {
      this.router.navigate(['/home']);
      return false;
    }
    return !!canAccessApp;
  }
}
