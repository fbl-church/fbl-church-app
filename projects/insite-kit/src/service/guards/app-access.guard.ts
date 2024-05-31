import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

const DEFAULT_APP_ROUTES = ['login', 'home', 'profile'];

export const APP_ACCESS_GUARD: CanActivateFn = (route) => {
  const userAccessService = inject(UserAccessService);
  const navigationService = inject(NavigationService);

  if (DEFAULT_APP_ROUTES.includes(route.routeConfig.path)) {
    return of(true);
  }

  return userAccessService.user$.pipe(
    map((ua) => ua.hasApp(route.routeConfig.path)),
    map((access) => {
      if (!access && navigationService.routerUrl() === '') {
        inject(Router).navigate(['/profile']);
        return false;
      }
      return access;
    })
  );
};
