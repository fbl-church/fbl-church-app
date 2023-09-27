import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Observable, tap } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class NurseryWorkersResolverService implements Resolve<any> {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService
  ) {}
  resolve(): Observable<User> {
    return this.userService
      .getUsers(
        new Map().set('webRole', [
          'NURSERY_DIRECTOR',
          'NURSERY_SUPERVISOR',
          'NURSERY_WORKER',
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
