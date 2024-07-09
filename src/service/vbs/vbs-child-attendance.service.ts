import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VBSChildAttendance, VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSChildAttendanceService {
  readonly BASE_VBS_PATH = 'api/vbs/children';

  constructor(private readonly request: RequestService, private readonly commonService: CommonService) {}

  /**
   *  Get all VBS children by attendance id
   *
   * @param attendanceId The attendance id
   * @returns A list of VBS children
   */
  getVBSChildrenByAttendanceId(
    attendanceId: number,
    params?: Map<string, string[]>
  ): Observable<HttpResponse<VBSChildAttendance[]>> {
    return this.request
      .get<VBSChildAttendance[]>(`${this.BASE_VBS_PATH}/attendance/${attendanceId}`, params)
      .pipe(tap((v) => v.body.forEach((c) => (c.formattedName = this.commonService.getFormattedName(c)))));
  }

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
