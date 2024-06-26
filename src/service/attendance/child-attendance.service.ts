import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildAttendanceService {
  readonly BASE_PATH = 'api/attendance-records';

  constructor(private readonly request: RequestService, private readonly commonService: CommonService) {}

  /**
   * Get an attendance record by id
   *
   * @param params to filter on
   * @returns Attendance Record object
   */
  getAttendanceChildrenById(id: any, params?: Map<string, string[]>): Observable<HttpResponse<ChildAttendance[]>> {
    return this.request
      .get<ChildAttendance[]>(`${this.BASE_PATH}/${id}/children`, params)
      .pipe(tap((v) => v.body.forEach((c) => (c.formattedName = this.commonService.getFormattedName(c)))));
  }

  /**
   * Gets the child attendance records
   *
   * @param childId The child to get the records for
   * @param params to filter on
   * @returns Attendance Record object
   */
  getChildAttendanceRecordsByChildId(
    childId: any,
    params?: Map<string, string[]>
  ): Observable<HttpResponse<ChildAttendance[]>> {
    return this.request
      .get<ChildAttendance[]>(`${this.BASE_PATH}/children/${childId}`, params)
      .pipe(tap((v) => v.body.forEach((c) => (c.formattedName = this.commonService.getFormattedName(c)))));
  }

  /**
   * Assign a child to an attendance record
   *
   * @param recordId The record id
   * @param childId The id of the child
   * @returns The updated Attendance Record object
   */
  assignChildToRecord(recordId: any, childId: any, notes: string): Observable<ChildAttendance> {
    return this.request.post<ChildAttendance>(`${this.BASE_PATH}/${recordId}/children`, { id: childId, notes: notes });
  }

  /**
   * Update the child notes
   *
   * @param recordId The record id
   * @param childId The id of the child
   * @param notes The children to put on the attendance record
   * @returns The updated Attendance Record object
   */
  updateChild(recordId: any, childId: any, notes: string, guardianId?: any): Observable<ChildAttendance> {
    return this.request.put<ChildAttendance>(`${this.BASE_PATH}/${recordId}/children`, {
      id: childId,
      notes: notes,
      guardianPickedUpId: guardianId,
    });
  }

  /**
   * Check out the child from the attendance record
   *
   * @param recordId The record id
   * @param childId The id of the child
   * @returns The updated child attendance
   */
  checkOutChild(recordId: any, childId: any, guardianId?: any): Observable<ChildAttendance> {
    return this.request.put<ChildAttendance>(`${this.BASE_PATH}/${recordId}/children/${childId}`, guardianId);
  }

  /**
   * Remove a child from an attendance record
   *
   * @param recordId The record id
   * @param childId The id of the child
   * @returns Completed Observable
   */
  removeChildFromRecord(recordId: any, childId: any): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${recordId}/children/${childId}`);
  }
}
