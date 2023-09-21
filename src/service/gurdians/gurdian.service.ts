import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GurdianService {
  readonly BASE_PATH = 'api/gurdians';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of gurdians based on the given request
   *
   * @param params to filter on
   * @returns Gurdian object
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Gurdian[]>> {
    return this.request.get<Gurdian[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
          u.formattedRelationship = this.commonService.translate(
            u.relationship,
            TranslationKey.RELATIONSHIP
          );
        })
      )
    );
  }

  /**
   * Get a gurdian for a given gurdian id
   *
   * @param params gurdian id for the gurdian to get
   * @returns Gurdian object
   */
  getById(id: number): Observable<HttpResponse<Gurdian>> {
    return this.request.get<Gurdian>(`${this.BASE_PATH}/${id.toString()}`);
  }

  /**
   * Get the gurdians for the given child id.
   *
   * @param params gurdian id for the gurdian to get
   * @returns Gurdian object
   */
  getGurdiansByChildId(childId: number): Observable<HttpResponse<Gurdian>> {
    return this.request.get<Gurdian>(`${this.BASE_PATH}/child/${childId}`).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
          u.formattedRelationship = this.commonService.translate(
            u.relationship,
            TranslationKey.RELATIONSHIP
          );
        })
      )
    );
  }

  /**
   * This will create a gurdian for the given object, but will default to a gurdian web role object.
   *
   * @param gurdian The gurdian to be created.
   * @returns The gurdian that was created.
   */
  create(gurdian: Gurdian): Observable<Gurdian> {
    return this.request.post<Gurdian>(this.BASE_PATH, gurdian);
  }

  /**
   * This will update the gurdians information for the given gurdian object.
   *
   * @param id The id of the gurdian
   * @param gurdian The gurdian information that needs updated.
   * @returns Gurdian object with the updated gurdian object.
   */
  update(id: any, gurdian: Gurdian): Observable<Gurdian> {
    return this.request.put<Gurdian>(`${this.BASE_PATH}/${id}`, gurdian);
  }

  /**
   * This will update the gurdians profile information for the given gurdian object.
   *
   * @param id The id of the gurdian
   * @param gurdian The gurdian information that needs updated.
   * @returns Gurdian object with the updated gurdian object.
   */
  updateProfile(id: any, gurdian: Gurdian): Observable<Gurdian> {
    return this.request.put<Gurdian>(
      `${this.BASE_PATH}/profile/${id}`,
      gurdian
    );
  }

  /**
   * Update a childs gurdians by id
   *
   * @param childId The child id to update
   * @param gurdians The list of gurdians to send
   * @returns The list of updated gurdians
   */
  updateChildGurdiansById(
    childId: any,
    gurdians: Gurdian[]
  ): Observable<Gurdian> {
    return this.request.put<Gurdian[]>(
      `${this.BASE_PATH}/${childId}/gurdians`,
      gurdians
    );
  }

  /**
   * Update an existing user to have the gurdian role
   *
   * @param childId The user id to update
   * @param gurdian The gurdian user to be inserted
   * @returns The created gurdian
   */
  assignGurdianRoleToExistingUser(
    userId: any,
    gurdian: Gurdian
  ): Observable<Gurdian> {
    return this.request.put<Gurdian>(
      `${this.BASE_PATH}/${userId}/user`,
      gurdian
    );
  }

  /**
   * Delete the gurdian associated to the given id.
   *
   * @param id of the gurdian to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
