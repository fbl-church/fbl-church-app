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
   */
  checkIn(childId: any, recordId: any, pointIds?: number[]): Observable<VBSPoint[]> {
    return this.request.post<VBSPoint[]>(`${this.BASE_VBS_PATH}/${childId}/attendance/${recordId}`, pointIds);
  }

  /**
   * Mark a child as absent
   *
   * @param childId Child id
   * @param recordId  Record id
   */
  markAbsent(childId: any, recordId: any): Observable<any> {
    return this.request.delete<any>(`${this.BASE_VBS_PATH}/${childId}/attendance/${recordId}`);
  }
}
