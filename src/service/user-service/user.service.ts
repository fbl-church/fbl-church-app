import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application, User } from 'projects/insite-kit/src/models/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly BASE_USER_PATH = 'api/user-app/user-profile';
  readonly BASE_USER_STATUS_PATH = 'api/user-app/user-status';
  readonly BASE_USER_CREDENTIALS_PATH = 'api/user-app/user-credentials';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
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
          u.formattedRole = this.commonService.getFormattedRole(u.webRole);
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
    return this.request.get<User>(`${this.BASE_USER_PATH}/current-user`);
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
   * Gets the users applications that they have access too for the given user id.
   *
   * @param id The id of the user to get applications for.
   * @returns List of Application object
   */
  getUserAppsById(id: number): Observable<HttpResponse<Application[]>> {
    return this.request.get<Application[]>(
      `${this.BASE_USER_PATH}/${id}/application-access`
    );
  }

  /**
   * This will create a user for the given object, but will default to a user web role object.
   *
   * @param user The user to be created.
   * @returns The user that was created.
   */
  createUser(user: User): Observable<User> {
    return this.request.post<User>(this.BASE_USER_PATH, user);
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
   * Delete the user associated to the given id.
   *
   * @param id of the user to be deleted.
   */
  deleteUser(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_USER_PATH}/${id}`);
  }

  /**
   * Checks to see if the given user id has access to the application.
   *
   * @param id The user id to check.
   * @returns Boolean if the user has app access or not.
   */
  hasAppAccess(id: number): Observable<boolean> {
    return this.getUserById(id).pipe(map((res) => res.body.appAccess));
  }
}
