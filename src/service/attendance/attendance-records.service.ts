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
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
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
}
