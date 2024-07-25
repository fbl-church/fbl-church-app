import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VBSPoint, VBSPointDivision } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSPointDivisionService {
  readonly BASE_VBS_PATH = 'api/vbs/points/division';

  constructor(private readonly request: RequestService) {}

  /**
   * Get a list of point divisions by the theme id
   *
   * @param themeiD The vbs theme id
   */
  getByThemeId(themeId: any): Observable<HttpResponse<VBSPoint[]>> {
    return this.request.get<VBSPoint[]>(`${this.BASE_VBS_PATH}/themes/${themeId}`);
  }

  /**
   * Checks to see if the given value is within the range of any existing point
   *
   * @param id    The id of the theme to check
   * @param value The value to check
   * @return true if the value is within the range of any existing point, false
   *         otherwise
   */
  isRangeValueWithinExistingRangeForThemeId(themeId: any, value: any): Observable<HttpResponse<boolean>> {
    return this.request.get<boolean>(`${this.BASE_VBS_PATH}/themes/${themeId}/value/${value}/range-exist`);
  }

  /**
   * Create a new VBS point Division
   *
   * @param point The point to create
   */
  create(vbsThemeId: any, pointDivision: VBSPointDivision[]): Observable<VBSPoint[]> {
    return this.request.post<VBSPoint[]>(`${this.BASE_VBS_PATH}/themes/${vbsThemeId}`, pointDivision);
  }

  /**
   * Update a VBS point Division
   *
   * @param point The point to update
   */
  update(pointDivisionId: any, point: VBSPoint): Observable<any> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${pointDivisionId}`, point);
  }

  /**
   * Delete a VBS point Division
   *
   * @param point The point to delete
   */
  delete(pointDivisionId: any): Observable<void> {
    return this.request.delete<void>(`${this.BASE_VBS_PATH}/${pointDivisionId}`);
  }
}
