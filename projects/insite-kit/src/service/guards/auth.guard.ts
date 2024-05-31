import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../auth/jwt.service';

const UNAUTHENTICATED_ROUTES = ['login', 'forgot-password', 'reset-password/:id'];
export const AUTH_GUARD: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!inject(JwtService).isAuthenticated()) {
    if (!UNAUTHENTICATED_ROUTES.includes(route.routeConfig.path)) {
      router.navigate(['/login'], { queryParams: { redirect: state.url } });
      return false;
    }
  } else if (route.routeConfig.path === 'login') {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};
