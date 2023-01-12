import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PopupService } from '../popup/popup.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly popupService: PopupService
  ) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasFeatureAccess(next);
  }

  /**
   * Determine if the user has feature access to route to this page
   *
   * @param next snapshot of the active route
   * @returns boolean based on the status of the token
   */
  hasFeatureAccess(route: any): Observable<boolean> {
    const data = route.data;
    return this.authService
      .hasAccess(data.feature[0], data.feature[1], data.feature[2])
      .pipe(tap((access) => this.determineRoute(access, route)));
  }

  /**
   * Helper method to determine the route depending on if the user has access or not.
   */
  determineRoute(access: boolean, route: ActivatedRouteSnapshot) {
    if (!access) {
      this.popupService.warning(
        'You do not have permission to access that page.'
      );
      this.router.navigate([route.parent.routeConfig.path]);
    }
  }
}
