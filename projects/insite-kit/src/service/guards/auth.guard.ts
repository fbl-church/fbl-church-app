import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from '../auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly UNAUTHENTICATED_ROUTES = [
    'login',
    'register',
    'forgot-password',
    'reset-password/:id',
  ];

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService
  ) {}

  /**
   * Determine if the current user JWT token is valid. If the token is invalid or expired
   * then it will return false, otherwise true.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.jwt.isAuthenticated()) {
      if (!this.UNAUTHENTICATED_ROUTES.includes(next.routeConfig.path)) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if (next.routeConfig.path === 'login') {
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }
}
