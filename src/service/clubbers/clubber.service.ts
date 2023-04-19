import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubberService {
  readonly BASE_CLUBBERS_PATH = 'api/clubbers';

  constructor(private readonly request: RequestService) {}

  /**
   * Get a list of clubbers based on the given request
   *
   * @param params to filter on
   * @returns Clubber object
   */
  getClubbers(
    params?: Map<string, string[]>
  ): Observable<HttpResponse<Clubber[]>> {
    return this.request.get<Clubber[]>(this.BASE_CLUBBERS_PATH, params);
  }

  /**
   * Get a clubber for a given clubber id
   *
   * @param params clubber id for the clubber to get
   * @returns Clubber object
   */
  getClubberById(id: number): Observable<Clubber> {
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
  createClubber(clubber: Clubber): Observable<Clubber> {
    return this.request.post<Clubber>(this.BASE_CLUBBERS_PATH, clubber);
  }
}
