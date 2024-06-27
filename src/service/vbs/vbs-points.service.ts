import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSPointsService {
  readonly BASE_VBS_PATH = 'api/vbs/points';

  constructor(private readonly request: RequestService) {}

  /**
   * Get a list of points by the theme id
   *
   * @param themeiD The vbs theme id
   */
  getByThemeId(themeId: any): Observable<HttpResponse<VBSPoint[]>> {
    return this.request.get<VBSPoint[]>(`${this.BASE_VBS_PATH}/themes/${themeId}`);
  }

  /**
   *  Check if a point name exists for a theme id
   *
   * @param themeId The vbs theme id
   * @param name  The name of the point
   * @returns  A boolean value indicating if the point name exists
   */
  doesPointNameExistForThemeId(themeId: any, name: string): Observable<HttpResponse<boolean>> {
    return this.request.get<boolean>(`${this.BASE_VBS_PATH}/themes/${themeId}/points/name/${name}`);
  }

  /**
   * Create a new VBS point
   *
   * @param point The point to create
   */
  create(vbsThemeId: any, point: VBSPoint[]): Observable<VBSPoint[]> {
    return this.request.post<VBSPoint[]>(`${this.BASE_VBS_PATH}/themes/${vbsThemeId}`, point);
  }

  /**
   * Update a VBS point
   *
   * @param point The point to update
   */
  update(pointId: any, point: VBSPoint): Observable<VBSPoint[]> {
    return this.request.put<VBSPoint[]>(`${this.BASE_VBS_PATH}/${pointId}`, point);
  }

  /**
   * Delete a VBS point
   *
   * @param point The point to delete
   */
  delete(pointId: any): Observable<void> {
    return this.request.delete<void>(`${this.BASE_VBS_PATH}/${pointId}`);
  }
}
