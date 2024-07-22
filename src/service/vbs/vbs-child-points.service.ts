import { Injectable } from '@angular/core';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { VBSChildPoint } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSChildPointsService {
  readonly BASE_VBS_PATH = 'api/vbs/children';
  readonly BASE_VBS_REPORTS_PATH = 'api/vbs/reports';

  constructor(private readonly request: RequestService) {}

  /**
   *  Add points to a child by child id
   *
   * @param childId  The child id
   * @param points  The points to add
   * @returns   A list of points added to the child
   */
  updateChildPoints(childId: any, points: VBSChildPoint[]): Observable<any> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${childId}/points`, points);
  }

  /**
   * Download child points cards
   *
   * @param type The type of church group schedule to download
   * @returns The pdf of the child points
   */
  downloadChildPointsCards(themeId: any, type: ChurchGroup) {
    return this.request.download(`${this.BASE_VBS_REPORTS_PATH}/theme/${themeId}/group/${type}/children/points-pdf`);
  }
}
