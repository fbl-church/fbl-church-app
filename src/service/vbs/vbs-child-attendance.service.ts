import { Injectable } from '@angular/core';
import { VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSChildAttendanceService {
  readonly BASE_VBS_PATH = 'api/vbs/children';

  constructor(private readonly request: RequestService) {}

  /**
   *  Add points to a child by child id
   *
   * @param childId  The child id
   * @param points  The points to add
   * @returns   A list of points added to the child
   */
  checkIn(childId: any, recordId: any, pointIds?: number[]): Observable<VBSPoint[]> {
    return this.request.post<VBSPoint[]>(`${this.BASE_VBS_PATH}/${childId}/attendance/${recordId}`, pointIds);
  }
}
