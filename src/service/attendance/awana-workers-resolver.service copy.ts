import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Observable, tap } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AwanaWorkersResolverService implements Resolve<any> {
  constructor(private readonly userService: UserService, private readonly commonService: CommonService) {}
  resolve(): Observable<User> {
    return this.userService
      .getUsers(
        new Map().set('webRole', [
          WebRole.AWANA_DIRECTOR,
          WebRole.AWANA_LEADER,
          WebRole.AWANA_REGISTRATION,
          WebRole.AWANA_WORKER,
          WebRole.TNT_LEADER,
          WebRole.TNT_WORKER,
          WebRole.CUBBIES_LEADER,
          WebRole.CUBBIES_WORKER,
          WebRole.SPARKS_LEADER,
          WebRole.SPARKS_WORKER,
        ])
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
