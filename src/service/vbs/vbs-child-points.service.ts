import { Injectable } from '@angular/core';
import { VBSChildPoint } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSChildPointsService {
  readonly BASE_VBS_PATH = 'api/vbs/children';

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
}
