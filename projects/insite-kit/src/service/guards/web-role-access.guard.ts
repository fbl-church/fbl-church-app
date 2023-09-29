import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, filter, forkJoin, map, take } from 'rxjs';
import { WebRole } from '../../model/common.model';
import { UserAccessService } from '../auth/user-access.service';

@Injectable({
  providedIn: 'root',
})
export class WebRoleAccessGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userAccessService: UserAccessService
  ) {}

  /**
   * Determine if the user has the correct roles to trigger this guard.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the user roles
   */
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return forkJoin(
      next.data.roles.map((r: WebRole) =>
        this.userAccessService.user$.pipe(
          filter((u) => !!u),
          map((ua) => ua.hasRole(r)),
          take(1)
        )
      )
    ).pipe(
      map((v: any) => {
        if (!v.includes(false)) {
          return true;
        } else if (this.router.routerState.snapshot.url === '') {
          this.router.navigate(['/profile']);
          return false;
        } else {
          return false;
        }
      })
    );
  }
}
