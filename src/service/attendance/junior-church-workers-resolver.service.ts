import { Injectable } from '@angular/core';

import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Observable, tap } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class JuniorChurchWorkersResolverService {
  constructor(private readonly userService: UserService, private readonly commonService: CommonService) {}
  resolve(): Observable<User> {
    return this.userService
      .getUsers(
        new Map().set('webRole', ['JUNIOR_CHURCH_DIRECTOR', 'JUNIOR_CHURCH_SUPERVISOR', 'JUNIOR_CHURCH_WORKER'])
      )
      .pipe(
        tap((v) =>
          v.body.forEach((u) => {
            u.formattedName = this.commonService.getFormattedName(u);
          })
        )
      );
  }
}
