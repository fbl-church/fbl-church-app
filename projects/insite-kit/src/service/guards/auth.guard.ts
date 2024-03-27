import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { JwtService } from '../auth/jwt.service';
import { NavigationService } from '../navigation/navigation.service';

export const AUTH_GUARD: CanActivateFn = (route) => inject(AuthGuard).canActivate(route);

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  private readonly UNAUTHENTICATED_ROUTES = ['login', 'register', 'forgot-password', 'reset-password/:id'];

  constructor(private readonly navigationService: NavigationService, private readonly jwt: JwtService) {}

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
        this.navigationService.navigate('/login');
        return false;
      }
    } else if (next.routeConfig.path === 'login') {
      this.navigationService.navigate('/profile');
      return false;
    }
    return true;
  }
}
