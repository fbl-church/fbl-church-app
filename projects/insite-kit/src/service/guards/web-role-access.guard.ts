import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, forkJoin, map, take } from 'rxjs';
import { WebRole } from '../../model/common.model';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

export const WEB_ROLE_ACCESS_GUARD: CanActivateFn = (route) => {
  const userAccessService = inject(UserAccessService);
  const navigationService = inject(NavigationService);

  return forkJoin(
    route.data.roles.map((r: WebRole) =>
      userAccessService.user$.pipe(
        filter((u) => !!u),
        map((ua) => ua.hasRole(r)),
        take(1)
      )
    )
  ).pipe(
    map((v: any) => {
      if (!v.includes(false)) {
        return true;
      } else if (navigationService.routerUrl() === '') {
        inject(Router).navigate(['/profile']);
      }
      return false;
    })
  );
};
