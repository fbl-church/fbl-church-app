import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD, Feature, WebRoleFeature } from 'projects/insite-kit/src/model/access.model';
import { TranslationKey, WebRole } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  readonly BASE_PATH = 'api/features';

  constructor(private readonly request: RequestService, private readonly commonService: CommonService) {}

  /**
   * Get a list of features based on the given request
   *
   * @param params to filter on
   * @returns List of feature objects
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Feature[]>> {
    return this.request.get<Feature[]>(this.BASE_PATH, params);
  }

  /**
   * Gets an feature by id.
   *
   * @param id The id of the feature to get
   * @returns The found feature
   */
  getById(id: number): Observable<HttpResponse<Feature>> {
    return this.request.get<Feature>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Gets a web role feature access by feature id
   *
   * @param id The id of the feature
   * @returns The page of web role access for the features
   */
  getWebRoleFeatureAccessById(id: any, params?: Map<string, string[]>): Observable<HttpResponse<WebRoleFeature[]>> {
    return this.request.get<WebRoleFeature[]>(`${this.BASE_PATH}/${id}/roles`, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedWebRole = this.commonService.translate(u.webRole, TranslationKey.WEB_ROLE);
        })
      )
    );
  }

  /**
   * Update the enabled flag of a feature
   *
   * @param id The app to update
   * @param enabled Wheather to enable or disable the feature
   * @returns The updated feature
   */
  updateEnabledFlag(id: any, enabled: boolean): Observable<Feature> {
    return this.request.put<Feature>(`${this.BASE_PATH}/${id}/enabled/${enabled}`);
  }

  /**
   * Updates the web role feature access
   *
   * @param featureId The id of the feature to get
   * @param webRole The web role to update on the feature
   * @param crud The crud fields to be set
   * @returns The updated web role feature
   */
  updateWebRoleFeatureAccess(featureId: number, webRole: WebRole, crud: CRUD): Observable<WebRoleFeature> {
    return this.request.put<WebRoleFeature>(`${this.BASE_PATH}/${featureId}/roles/${webRole}`, crud);
  }

  /**
   * Create a feature
   *
   * @param key The new key name
   * @param appId The application id
   */
  create(key: string, appId: any): Observable<Feature> {
    return this.request.post<Feature>(`${this.BASE_PATH}/app/${appId}`, {
      feature: key,
    });
  }

  /**
   * Delete the feature by Id
   *
   * @param id The app to delete
   */
  delete(id: any): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
