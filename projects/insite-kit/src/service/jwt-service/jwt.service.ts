import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'projects/insite-kit/src/models/user.model';
import { WebRole } from '../../models/common.model';

export const TOKEN_NAME = 'token';

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
  isAuthenticated() {
    if (localStorage.getItem(TOKEN_NAME) != null) {
      if (this.jwtHelperService.isTokenExpired()) {
        localStorage.removeItem(TOKEN_NAME);
        return false;
      }
      return true;
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
  get(value: any, tokenOverride?: string) {
    const reviewedToken = tokenOverride ? tokenOverride : this.getToken();
    return this.jwtHelperService.decodeToken(reviewedToken)[value];
  }

  /**
   * Gets the user id from the jwt token.
   *
   * @returns The user's id.
   */
  getRequiredUserId() {
    return Number(this.get('userId'));
  }

  /**
   * Gets the user webrole from the jwt token.
   *
   * @returns The user's webrole.
   */
  getRequiredWebRole() {
    return this.get('webRole') as keyof typeof WebRole;
  }

  getUser(): User {
    return {
      id: this.getRequiredUserId(),
      firstName: this.get('firstName'),
      lastName: this.get('lastName'),
      email: this.get('email'),
      webRole: this.getRequiredWebRole(),
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
