import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from '../jwt-service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwt: JwtService) {}
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
      if (next.routeConfig.path !== 'login') {
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
    if (['login', 'home', 'profile'].includes(next.routeConfig.path))
      return true;

    const appAccess = this.jwt
      .get('apps')
      .filter((path) => path.includes(next.routeConfig.path));

    return appAccess.length > 0;
  }
}
