import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { UserService } from 'src/service/users/user.service';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

export const USER_EDIT_ACCESS_GUARD: CanActivateFn = (route) => {
  const userService = inject(UserService);
  const userAccessService = inject(UserAccessService);
  const navigationService = inject(NavigationService);
  const router = inject(Router);

  return combineLatest([userService.getById(route.paramMap.get('id')), userAccessService.user$]).pipe(
    map(([userToEdit, currentUser]) => {
      const canEdit = currentUser.canEditUser(userToEdit.body.webRole);
      if (canEdit) {
        return true;
      } else if (navigationService.routerUrl() === '') {
        router.navigate(['/profile']);
        return false;
      }
      return false;
    })
  );
};
