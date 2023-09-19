import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CRUD,
  Feature,
  WebRoleFeature,
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
export class FeatureService {
  readonly BASE_PATH = 'api/features';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

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
  getWebRoleFeatureAccessById(
    id: any,
    params?: Map<string, string[]>
  ): Observable<HttpResponse<WebRoleFeature[]>> {
    return this.request
      .get<WebRoleFeature[]>(`${this.BASE_PATH}/${id}/roles`, params)
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
   * Updates the web role feature access
   *
   * @param featureId The id of the feature to get
   * @param webRole The web role to update on the feature
   * @param crud The crud fields to be set
   * @returns The updated web role feature
   */
  updateWebRoleFeatureAccess(
    featureId: number,
    webRole: WebRole,
    crud: CRUD
  ): Observable<WebRoleFeature> {
    return this.request.put<WebRoleFeature>(
      `${this.BASE_PATH}/${featureId}/roles/${webRole}`,
      crud
    );
  }
}
