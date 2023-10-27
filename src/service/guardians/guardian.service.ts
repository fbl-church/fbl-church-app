import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardianService {
  readonly BASE_PATH = 'api/guardians';

  constructor(private readonly request: RequestService, private readonly commonService: CommonService) {}

  /**
   * Get a list of guardians based on the given request
   *
   * @param params to filter on
   * @returns Guardian object
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Guardian[]>> {
    return this.request.get<Guardian[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
          u.formattedRelationship = this.commonService.translate(u.relationship, TranslationKey.RELATIONSHIP);
        })
      )
    );
  }

  /**
   * Get a guardian for a given guardian id
   *
   * @param params guardian id for the guardian to get
   * @returns Guardian object
   */
  getById(id: number): Observable<HttpResponse<Guardian>> {
    return this.request.get<Guardian>(`${this.BASE_PATH}/${id.toString()}`);
  }

  /**
   * Get the guardians for the given child id.
   *
   * @param params guardian id for the guardian to get
   * @returns Guardian object
   */
  getGuardiansByChildId(childId: number): Observable<HttpResponse<Guardian>> {
    return this.request.get<Guardian>(`${this.BASE_PATH}/child/${childId}`).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
          u.formattedRelationship = this.commonService.translate(u.relationship, TranslationKey.RELATIONSHIP);
        })
      )
    );
  }

  /**
   * Checks to see if the passed in guardian first name and last name already exist
   *
   * @param firstName The first Name
   * @param lastName The last name
   * @returns The guardian that was found or null if not found
   */
  doesGuardianExist(guardian: Guardian): Observable<HttpResponse<Guardian>> {
    return this.request.get<Guardian>(
      `${this.BASE_PATH}/exists`,
      new Map().set('firstName', [guardian.firstName]).set('lastName', [guardian.lastName])
    );
  }

  /**
   * This will create a guardian for the given object, but will default to a guardian web role object.
   *
   * @param guardian The guardian to be created.
   * @returns The guardian that was created.
   */
  create(guardian: Guardian): Observable<Guardian> {
    return this.request.post<Guardian>(this.BASE_PATH, guardian);
  }

  /**
   * This will update the guardians information for the given guardian object.
   *
   * @param id The id of the guardian
   * @param guardian The guardian information that needs updated.
   * @returns Guardian object with the updated guardian object.
   */
  update(id: any, guardian: Guardian): Observable<Guardian> {
    return this.request.put<Guardian>(`${this.BASE_PATH}/${id}`, guardian);
  }

  /**
   * This will update the guardians profile information for the given guardian object.
   *
   * @param id The id of the guardian
   * @param guardian The guardian information that needs updated.
   * @returns Guardian object with the updated guardian object.
   */
  updateProfile(id: any, guardian: Guardian): Observable<Guardian> {
    return this.request.put<Guardian>(`${this.BASE_PATH}/profile/${id}`, guardian);
  }

  /**
   * Update a childs guardians by id
   *
   * @param childId The child id to update
   * @param guardians The list of guardians to send
   * @returns The list of updated guardians
   */
  updateChildGuardiansById(childId: any, guardians: Guardian[]): Observable<Guardian> {
    return this.request.put<Guardian[]>(`${this.BASE_PATH}/${childId}/guardians`, guardians);
  }

  /**
   * Update an existing user to have the guardian role
   *
   * @param childId The user id to update
   * @param guardian The guardian user to be inserted
   * @returns The created guardian
   */
  assignGuardianRoleToExistingUser(userId: any, guardian: Guardian): Observable<Guardian> {
    return this.request.put<Guardian>(`${this.BASE_PATH}/${userId}/user`, guardian);
  }

  /**
   * Delete the guardian associated to the given id.
   *
   * @param id of the guardian to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
