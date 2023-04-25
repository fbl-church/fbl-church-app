import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gurdian } from 'projects/insite-kit/src/model/clubber.model';
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
          u.formattedRelationship = this.commonService.getFormattedRelationship(
            u.relationship
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
   * Get the gurdians for the given clubber id.
   *
   * @param params gurdian id for the gurdian to get
   * @returns Gurdian object
   */
  getGurdiansByClubberId(clubberId: number): Observable<HttpResponse<Gurdian>> {
    return this.request
      .get<Gurdian>(`${this.BASE_PATH}/clubber/${clubberId}`)
      .pipe(
        tap((v) =>
          v.body.forEach((u) => {
            u.formattedName = this.commonService.getFormattedName(u);
            u.formattedRelationship =
              this.commonService.getFormattedRelationship(u.relationship);
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
   * Delete the gurdian associated to the given id.
   *
   * @param id of the gurdian to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
