import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceRecordsService {
  readonly BASE_PATH = 'api/attendance-records';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of attendance records based on the given request
   *
   * @param params to filter on
   * @returns List of Attendance Record objects
   */
  get(
    params?: Map<string, string[]>
  ): Observable<HttpResponse<AttendanceRecord[]>> {
    return this.request.get<AttendanceRecord[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((ar) => {
          ar.formattedType = this.commonService.getFormattedChurchGroup(
            ar.type
          );
        })
      )
    );
  }

  /**
   * Get an attendance record by id
   *
   * @param params to filter on
   * @returns Attendance Record object
   */
  getById(id: any): Observable<HttpResponse<AttendanceRecord>> {
    return this.request
      .get<AttendanceRecord>(`${this.BASE_PATH}/${id}`)
      .pipe(
        tap(
          (v) =>
            (v.body.formattedType = this.commonService.getFormattedChurchGroup(
              v.body.type
            ))
        )
      );
  }

  /**
   * Create a new attendance record
   *
   * @param record The record to create
   * @returns Attendance Record object
   */
  create(record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.request.post<AttendanceRecord>(this.BASE_PATH, record);
  }

  /**
   * Update an attendance record
   *
   * @param id The id of the record to update
   * @param record The record to be updated
   * @returns Attendance Record object
   */
  update(id: any, record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.request.put<AttendanceRecord>(
      `${this.BASE_PATH}/${id}`,
      record
    );
  }

  /**
   * Delete an attendance record
   *
   * @param id The record id to be deleted
   * @returns Completed Observable
   */
  delete(id: any): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
