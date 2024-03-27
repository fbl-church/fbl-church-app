import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from 'src/service/users/user.service';
import { UserAccessService } from '../auth/user-access.service';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class UserEditAccessGuard  {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly userService: UserService,
    private readonly userAccessService: UserAccessService
  ) {}

  /**
   * Determine if the user has the correct roles to edit the accessing user
   *
   * @param route snapshot of the active route
   * @returns boolean based on the status of the user roles
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return combineLatest([this.userService.getUserById(route.paramMap.get('id')), this.userAccessService.user$]).pipe(
      map(([userToEdit, currentUser]) => {
        const canEdit = currentUser.canEditUser(userToEdit.body.webRole);
        if (canEdit) {
          return true;
        } else if (this.navigationService.routerUrl() === '') {
          this.navigationService.navigate('/profile');
        }
        return false;
      })
    );
  }
}
