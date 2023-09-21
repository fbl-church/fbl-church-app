import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { Guardian, User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GuardianService } from '../guardians/guardian.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<any> {
  constructor(
    private userService: UserService,
    private readonly guardianService: GuardianService,
    private readonly jwt: JwtService
  ) {}
  resolve(): Observable<User | Guardian> {
    if (this.jwt.getWebRoles().includes(WebRole.GUARDIAN)) {
      return this.guardianService.getById(this.jwt.getUserId()).pipe(
        catchError(() => {
          return of(null);
        })
      );
    } else {
      return this.userService.getCurrentUser().pipe(
        catchError(() => {
          return of(null);
        })
      );
    }
  }
}
