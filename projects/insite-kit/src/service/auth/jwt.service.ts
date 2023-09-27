import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RankedWebRole, WebRole } from '../../model/common.model';
import { User } from '../../model/user.model';

export const TOKEN_NAME = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private router: Router,
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
   * Checks to see if the logged in user is authenticated already. If the users
   * token is expired then it will remove and route them to the login screen.
   *
   * @returns Boolean if the user is authenticated or not.
   */
  isAuthenticated(): boolean {
    if (localStorage.getItem(TOKEN_NAME) != null) {
      if (this.jwtHelperService.isTokenExpired()) {
        localStorage.removeItem(TOKEN_NAME);
        return false;
      }
      return true;
    } else {
      return false;
    }
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
   * Gets the user web roles from the jwt token.
   *
   * @returns The user's webrole.
   */
  getWebRoles(): WebRole[] {
    const stringArray: any[] = this.get('webRole');
    return stringArray.map((r) => r as WebRole);
  }

  /**
   * Gets the users ranked web roles
   *
   * @returns The user's webrole.
   */
  getRankedWebRoles(): RankedWebRole[] {
    const stringArray: any[] = this.get('webRole');
    return stringArray.map((r) => r as RankedWebRole);
  }

  /**
   * Determines if the user has thae passed in role.
   *
   * @param r The role to check for.
   * @returns The boolean if the user has the role or not.
   */
  hasWebRole(...r: WebRole[]): boolean {
    return this.getWebRoles().some((w) => r.includes(w));
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
    return roles.includes(WebRole.GUARDIAN) && roles.length == 1;
  }

  /**
   * Will return the user apps they have access too
   *
   * @returns List of string names apps
   */
  getApps(): string[] {
    return this.get('apps');
  }

  /**
   * Will get the user object from the signed in JWT
   *
   * @returns The User object information
   */
  getUser(): User {
    return {
      id: this.getUserId(),
      firstName: this.get('firstName'),
      lastName: this.get('lastName'),
      email: this.get('email'),
      webRole: this.getWebRoles(),
    };
  }

  /**
   * Will log a user out of the application and route them to the login
   * page.
   */
  logOut() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }
}
