import { Injectable } from '@angular/core';

import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { UserAccess } from 'projects/insite-kit/src/model/user-access.model';
import { Guardian, User } from 'projects/insite-kit/src/model/user.model';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { Observable, iif, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { GuardianService } from '../guardians/guardian.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService  {
  constructor(
    private userService: UserService,
    private readonly guardianService: GuardianService,
    private readonly userAccessService: UserAccessService
  ) {}
  resolve(): Observable<User | Guardian> {
    return this.userAccessService.user$.pipe(
      switchMap((ua) => this.getUserTypeData(ua)),
      catchError(() => {
        return of(null);
      })
    );
  }

  getUserTypeData(ua: UserAccess) {
    return iif(
      () => ua.hasRole(WebRole.GUARDIAN),
      this.guardianService.getById(ua.userId),
      this.userService.getCurrentUser()
    );
  }
}
