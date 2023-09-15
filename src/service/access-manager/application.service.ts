import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  readonly BASE_PATH = 'api/applications';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of applications based on the given request
   *
   * @param params to filter on
   * @returns List of Application objects
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Application[]>> {
    return this.request.get<Application[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.translate(
            u.name,
            TranslationKey.APPS
          );
        })
      )
    );
  }

  /**
   * Gets an application by id.
   *
   * @param id The id of the application to get
   * @returns The found application
   */
  getById(id: number): Observable<HttpResponse<Application>> {
    return this.request.get<Application>(`${this.BASE_PATH}/${id}`).pipe(
      tap((v) => {
        v.body.formattedName = this.commonService.translate(
          v.body.name,
          TranslationKey.APPS
        );
      })
    );
  }

  /**
   * Update the enabled flag of an application
   *
   * @param id The app to update
   * @param enabled Wheather to enable or disable the application
   * @returns The updated Application
   */
  updateEnabledFlag(id: any, enabled: boolean): Observable<Application> {
    return this.request.put<Application>(
      `${this.BASE_PATH}/${id}/enabled/${enabled}`
    );
  }

  /**
   * Create a new application
   *
   * @param app The app to be created
   * @returns The created application
   */
  create(app: Application): Observable<Application> {
    return this.request.post<Application>(this.BASE_PATH, app);
  }

  /**
   * Delete the application by Id
   *
   * @param id The app to delete
   */
  delete(id: any): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
