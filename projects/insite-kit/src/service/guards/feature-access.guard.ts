import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, forkJoin, map, take } from 'rxjs';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

export const FEATURE_ACCESS_GUARD: CanActivateFn = (route) => {
  const userAccessService = inject(UserAccessService);
  const navigationService = inject(NavigationService);
  const router = inject(Router);

  return forkJoin(
    route.data.FEATURE_ACCESS_GUARDS.map((d: any) =>
      userAccessService.user$.pipe(
        filter((u) => !!u),
        map((ua) => ua.hasFeature(d.app, d.feature, d.access)),
        take(1)
      )
    )
  ).pipe(
    map((v: any) => {
      if (!v.includes(false)) {
        return true;
      } else if (navigationService.routerUrl() === '') {
        router.navigate(['/profile']);
        return false;
      }
      return false;
    })
  );
};
