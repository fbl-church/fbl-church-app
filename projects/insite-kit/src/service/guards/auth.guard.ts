import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { JwtService } from '../auth/jwt.service';

const UNAUTHENTICATED_ROUTES = ['login', 'register', 'forgot-password', 'reset-password/:id'];
export const AUTH_GUARD: CanActivateFn = (route) => {
  if (!inject(JwtService).isAuthenticated()) {
    if (!UNAUTHENTICATED_ROUTES.includes(route.routeConfig.path)) {
      return createUrlTreeFromSnapshot(route, ['/', 'login']);
    }
  } else if (route.routeConfig.path === 'login') {
    return createUrlTreeFromSnapshot(route, ['/', 'profile']);
  }
  return true;
};
