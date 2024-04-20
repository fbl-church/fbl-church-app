import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly location: Location, private readonly navigationRouter: Router) {}

  get router() {
    return this.navigationRouter;
  }

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
        this.navigationRouter.navigate([defaultRoute]);
      } else {
        this.navigationRouter.navigate(['/profile']);
      }
    }
  }

  /**
   * Navigates to the given route based on the current tree url.
   *
   * @param route The route to go to
   * @param addToHistory Determines if the route should be added to the history tree
   */
  navigate(route: string, addToHistory = true): Promise<boolean> {
    return this.navigationRouter.navigate([route], { replaceUrl: !addToHistory });
  }

  /**
   * Gets the current router url
   *
   * @returns String of the current router url
   */
  routerUrl(): string {
    return this.navigationRouter.routerState.snapshot.url;
  }
}
