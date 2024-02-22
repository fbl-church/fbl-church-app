import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly location: Location, private readonly router: Router) {}

  /**
   * This will navigate to the previous route. If there is no previous route in
   * the location then it will use the default route. If there is no default route
   * present it will navigate the user to their profile page.
   *
   * @param defaultRoute The default route to navigate too if there is no previous route.
   */
  back(defaultRoute?: string) {
    const navState: any = this.location.getState();
    if (navState.navigationId > 1) {
      this.location.back();
    } else {
      if (defaultRoute) {
        this.router.navigate([defaultRoute]);
      } else {
        this.router.navigate(['/profile']);
      }
    }
  }
}
