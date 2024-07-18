import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
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
   * @param id The vbs attendance record id
   * @param record The vbs attendance record to update
   */
  update(id: any, record: VBSAttendanceRecord): Observable<HttpResponse<any>> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${id}`, record);
  }

  /**
   * Update attendance status
   *
   * @param attendanceId VBS attendance id
   * @param status  VBS attendance status
   */
  updateStatus(attendanceId: any, status: AttendanceStatus): Observable<any> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${attendanceId}/status/${status}`);
  }

  /**
   * Reopens a vbs attendance record by id
   *
   * @param id The id of the record to update
   * @returns The repoened Attendance Record object
   */
  reopenAttendance(id: any): Observable<any> {
    return this.request.put<any>(`${this.BASE_VBS_PATH}/${id}/reopen`);
  }

  /**
   * Create a VBS Attendance record by theme id
   *
   * @param vbsThemeId The vbs attendance record id
   * @param record The vbs attendance record to create
   */
  create(vbsThemeId: any, record: VBSAttendanceRecord): Observable<VBSAttendanceRecord> {
    return this.request.post<VBSAttendanceRecord>(`${this.BASE_VBS_PATH}/themes/${vbsThemeId}`, record);
  }
}
