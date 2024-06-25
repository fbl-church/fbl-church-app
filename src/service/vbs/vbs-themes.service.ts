import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VBSTheme, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSThemesService {
  readonly BASE_VBS_PATH = 'api/vbs/themes';

  constructor(private readonly request: RequestService) {}

  /**
   * Get a list of vbs themes
   *
   * @param params to filter on
   * @returns vbs theme object
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<VBSTheme[]>> {
    return this.request.get<VBSTheme[]>(this.BASE_VBS_PATH, params);
  }

  /**
   * Get a list of vbs themes
   *
   * @param params to filter on
   * @returns vbs theme object
   */
  getById(id: any): Observable<HttpResponse<VBSTheme>> {
    return this.request.get<VBSTheme>(`${this.BASE_VBS_PATH}/${id}`);
  }

  /**
   * Get a list of vbs theme groups
   *
   * @param id The id of the theme
   * @returns vbs theme groups
   */
  getGroupsByThemeId(id: any): Observable<HttpResponse<VBSThemeGroup[]>> {
    return this.request.get<VBSThemeGroup[]>(`${this.BASE_VBS_PATH}/${id}/groups`);
  }

  /**
   * Get a list of vbs themes
   *
   * @param params to filter on
   * @returns vbs theme object
   */
  create(body: VBSTheme): Observable<VBSTheme> {
    return this.request.post<VBSTheme>(this.BASE_VBS_PATH, body);
  }

  /**
   * Get a list of vbs themes
   *
   * @param params to filter on
   * @returns vbs theme object
   */
  delete(id: any): Observable<VBSTheme> {
    return this.request.delete(`${this.BASE_VBS_PATH}/${id}`);
  }
}
