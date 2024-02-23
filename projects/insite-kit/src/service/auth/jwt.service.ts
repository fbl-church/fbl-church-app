import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebRole } from '../../model/common.model';
import { User } from '../../model/user.model';
import { NavigationService } from '../navigation/navigation.service';

export const TOKEN_NAME = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  /**
   * Gets the raw token that is currently stored for the logged in user.
   *
   * @returns String of the raw json web token.
   */
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  /**
   * Sets the users jwt token. Only called when the user is authenticated.
   *
   * @param token The token to set in the local storage.
   */
  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  /**
   * Will remove the token from local storage
   */
  removeToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  /**
   * Checks to see if the logged in user is authenticated already. If the users
   * token is expired then it will remove and route them to the login screen.
   *
   * @returns Boolean if the user is authenticated or not.
   */
  isAuthenticated(): boolean {
    if (localStorage.getItem(TOKEN_NAME) != null) {
      if (this.jwtHelperService.isTokenExpired()) {
        this.logOut();
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets a property from the jwt token. If the property does not exist on
   * the token then it will return null.
   *
   * @param value The value to get from the jwt token.
   * @param tokenOverride If the token override needs to be used over the stored value.
   * @returns The property on the jwt token.
   */
  get(value: any, tokenOverride?: string): any {
    const reviewedToken = tokenOverride ? tokenOverride : this.getToken();
    return this.jwtHelperService.decodeToken(reviewedToken)[value];
  }

  /**
   * Gets the user id from the jwt token.
   *
   * @returns The user's id.
   */
  getUserId(): number {
    return Number(this.get('userId'));
  }

  /**
   * Gets the environment of the token
   *
   * @returns The tokens environment
   */
  getEnvironment(): string {
    return this.get('env');
  }

  /**
   * Gets the user web roles from the jwt token.
   *
   * @returns The user's webrole.
   */
  getWebRoles(): WebRole[] {
    const stringArray: any[] = this.get('webRole');
    return stringArray.map((r) => r as WebRole);
  }

  /**
   * Determines if the user that is logged in is a guardian only user
   *
   * @returns The boolean if the user is a guardian only user.
   */
  isGuardianOnlyUser(u?: User): boolean {
    let roles = this.getWebRoles();
    if (u) {
      roles = u.webRole;
    }
    const expectedRolesLength = roles.includes(WebRole.USER) ? 2 : 1;
    return roles.includes(WebRole.GUARDIAN) && roles.length == expectedRolesLength;
  }

  /**
   * Will log a user out of the application and route them to the login
   * page.
   */
  logOut() {
    this.removeToken();
    this.navigationService.navigate('login').then(() => window.location.reload());
  }
}
