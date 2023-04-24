import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubberService {
  readonly BASE_CLUBBERS_PATH = 'api/clubbers';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of clubbers based on the given request
   *
   * @param params to filter on
   * @returns Clubber object
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Clubber[]>> {
    return this.request.get<Clubber[]>(this.BASE_CLUBBERS_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedGroup = this.commonService.getFormattedChurchGroup(
            u.churchGroup
          );
        })
      )
    );
  }

  /**
   * Get a clubber for a given clubber id
   *
   * @param params clubber id for the clubber to get
   * @returns Clubber object
   */
  getById(id: number): Observable<Clubber> {
    return this.request.get<Clubber>(
      `${this.BASE_CLUBBERS_PATH}/${id.toString()}`
    );
  }

  /**
   * This will create a clubber for the given object, but will default to a clubber web role object.
   *
   * @param clubber The clubber to be created.
   * @returns The clubber that was created.
   */
  create(clubber: Clubber): Observable<Clubber> {
    return this.request.post<Clubber>(this.BASE_CLUBBERS_PATH, clubber);
  }

  /**
   * Delete the clubber associated to the given id.
   *
   * @param id of the clubber to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_CLUBBERS_PATH}/${id}`);
  }
}
