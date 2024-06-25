import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSAttendanceService {
  readonly BASE_VBS_PATH = 'api/vbs/attendance';

  constructor(private readonly request: RequestService) {}

  /**
   * Get VBS Attendance Record by  id
   *
   * @param id The vbs attendance id
   */
  getById(id: any): Observable<HttpResponse<VBSAttendanceRecord>> {
    return this.request.get<VBSAttendanceRecord>(`${this.BASE_VBS_PATH}/${id}`);
  }

  /**
   * Get VBS Attendance Records by theme id
   *
   * @param vbsThemeId The vbs theme id
   */
  getByThemeId(vbsThemeId: any): Observable<HttpResponse<VBSAttendanceRecord[]>> {
    return this.request.get<VBSAttendanceRecord[]>(`${this.BASE_VBS_PATH}/themes/${vbsThemeId}`);
  }

  /**
   * Update a VBS Attendance record by id
   *
   * @param vbsThemeId The vbs attendance record id
   * @param record The vbs attendance record to update
   */
  update(id: any, record: VBSAttendanceRecord): Observable<HttpResponse<any>> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${id}`, record);
  }
}
