import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Application,
  WebRoleApp,
} from 'projects/insite-kit/src/model/access.model';
import {
  TranslationKey,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
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
    return this.request.get<Application[]>(this.BASE_PATH, params);
  }

  /**
   * Gets an application by id.
   *
   * @param id The id of the application to get
   * @returns The found application
   */
  getById(id: number): Observable<HttpResponse<Application>> {
    return this.request.get<Application>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Gets a web role feature access by feature id
   *
   * @param id The id of the feature
   * @returns The page of web role access for the features
   */
  getWebRoleAppAccessById(
    id: any,
    params?: Map<string, string[]>
  ): Observable<HttpResponse<WebRoleApp[]>> {
    return this.request
      .get<WebRoleApp[]>(`${this.BASE_PATH}/${id}/roles`, params)
      .pipe(
        tap((v) =>
          v.body.forEach((u) => {
            u.formattedWebRole = this.commonService.translate(
              u.webRole,
              TranslationKey.WEB_ROLE
            );
          })
        )
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
   * Updates the web role app access
   *
   * @param appId The id of the app to update
   * @param webRole The web role to update on the feature
   * @param access The access to give the web role
   * @returns The updated web role feature
   */
  updateWebRoleAppAccess(
    appId: number,
    webRole: WebRole,
    access: boolean
  ): Observable<WebRoleApp> {
    return this.request.put<WebRoleApp>(
      `${this.BASE_PATH}/${appId}/roles/${webRole}/access/${access}`
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
