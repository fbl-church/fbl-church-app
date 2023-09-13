import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, forkJoin, map, of } from 'rxjs';
import { WebRole } from '../../model/common.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class WebRoleAccessGuard implements CanActivate {
  constructor(private router: Router, private readonly jwt: JwtService) {}

  /**
   * Determine if the user has the correct roles to trigger this guard.
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the user roles
   */
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return forkJoin(
      next.data.roles.map((d: WebRole) => of(this.jwt.hasWebRole(d)))
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
