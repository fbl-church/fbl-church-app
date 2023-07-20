import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { PasswordUpdate } from 'projects/insite-kit/src/model/password-update.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_USER_PATH = 'api/users';
  readonly BASE_USER_CREDENTIALS_PATH = 'api/users/credentials';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService,
    private readonly jwt: JwtService
  ) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
   */
  getUsers(params?: Map<string, string[]>): Observable<HttpResponse<User[]>> {
    return this.request.get<User[]>(this.BASE_USER_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
        })
      )
    );
  }

  /**
   * This will get the user object of the current user that is logged in.
   *
   * @returns User object of the current user.
   */
  getCurrentUser(): Observable<HttpResponse<User>> {
    return this.getUserById(this.jwt.getUserId());
  }

  /**
   * Get a user for a given user id
   *
   * @param params user id for the user to get
   * @returns User object
   */
  getUserById(id: number): Observable<HttpResponse<User>> {
    return this.request.get<User>(`${this.BASE_USER_PATH}/${id.toString()}`);
  }

  /**
   * This will check to see if the email exists already. Used to see if a user can create
   * an account with the email they have chosen.
   *
   * @param email The email to check.
   * @returns Boolean of the status of the email.
   */
  doesEmailExist(email: string): Observable<HttpResponse<boolean>> {
    return this.request.get<boolean>(
      `${this.BASE_USER_PATH}/check-email?email=${email}`
    );
  }

  /**
   * This will create a user. This method is used when creating an existing user with elevated permissions
   * is creating an account for another user.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  createUser(user: User): Observable<User> {
    return this.request.post<User>(`${this.BASE_USER_PATH}/create`, user);
  }

  /**
   * This is called when a new user is registering. Meaning this user needs to be reviewed before they
   * are able to access the website.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  register(user: User): Observable<User> {
    return this.request.post<User>(`${this.BASE_USER_PATH}/register`, user);
  }

  /**
   * This will update the current user information for the given user object.
   *
   * @param user The user information that needs updated.
   * @returns User object with the updated user object.
   */
  updateUserProfile(user: User): Observable<User> {
    return this.request.put<User>(`${this.BASE_USER_PATH}`, user);
  }

  /**
   * Update the given user data for the given user id
   *
   * @param id of the user to update.
   * @param user The user object to update
   * @returns User object
   */
  updateUserProfileById(id: number, user: User): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/${id.toString()}`,
      user
    );
  }

  /**
   * Update the given user roles by id
   *
   * @param id of the user to update.
   * @param roles The roles to update the user too.
   * @returns User object
   */
  updateUserRolesById(id: number, roles: any[]): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_PATH}/roles/${id.toString()}`,
      roles
    );
  }

  /**
   * This will update the current users password for the given password update
   * object
   *
   * @param passUpdate The object that contains the current password and new password.
   * @returns The user object of the user that was updated.
   */
  updateUserPassword(passUpdate: PasswordUpdate): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_CREDENTIALS_PATH}/password`,
      passUpdate
    );
  }

  /**
   * This will update the users password for the given password update
   * object and user id.
   *
   * @param userId The user that needs updated.
   * @param passUpdate The object that contains the current password and new password.
   * @returns The user object of the user that was updated.
   */
  updateUserPasswordById(
    userId: number,
    passUpdate: PasswordUpdate
  ): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_CREDENTIALS_PATH}/password/${userId.toString()}`,
      passUpdate
    );
  }

  /**
   * This will reset the users password for the given password update object.
   *
   * @param passUpdate The password update object the password needs to be.
   * @returns User Object of the user that was updated.
   */
  resetUserPassword(passUpdate: PasswordUpdate): Observable<User> {
    return this.request.put<User>(
      `${this.BASE_USER_CREDENTIALS_PATH}/password/reset`,
      passUpdate
    );
  }

  /**
   * Delete the user associated to the given id.
   *
   * @param id of the user to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_USER_PATH}/${id}`);
  }

  /**
   * Helper method to determine what roles the user is able to create.
   *
   * @returns Returns a list of roles the user is able to create
   */
  getAllowedRolesToCreate(): { id: string; name?: string; rank: any }[] {
    const userRoles: any[] = this.jwt.get('webRole');
    const maxUserRank = Math.max(...userRoles.map((r) => Number(WebRole[r])));
    let allowableRoles = this.getRolesAsMap().filter(
      (e) => e.rank <= maxUserRank
    );

    allowableRoles.forEach(
      (r) => (r.name = this.commonService.getFormattedRole(r.id))
    );

    return allowableRoles;
  }

  /**
   * Helper method to determine what roles the user is able to create.
   *
   * @returns Returns a list of roles the user is able to create
   */
  getRegisterRoles(): string[] {
    return this.getRolesAsMap()
      .filter((e) => e.rank <= WebRole.LEADER)
      .map((e) => e.name);
  }

  /**
   * Parses the roles enum into a map
   *
   * @returns The map of the roles enum.
   */
  getRolesAsMap(): { id: string; name?: string; rank: any }[] {
    return Object.entries(WebRole)
      .filter(
        (e) =>
          !e.includes('LEADER') && !e.includes('WORKER') && !e.includes('USER')
      )
      .map(([id, rank]) => ({ id, rank }))
      .filter((v) => Number.isInteger(v.rank));
  }
}
