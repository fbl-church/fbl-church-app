import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Observable, tap } from 'rxjs';
import { AttendanceRecordsService } from './attendance-records.service';

@Injectable({
  providedIn: 'root',
})
export class JuniorChurchChildrenResolverService implements Resolve<any> {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordsService,
    private readonly commonService: CommonService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ChildAttendance> {
    return this.attendanceRecordService
      .getAttendanceChildrenById(route.params.id)
      .pipe(
        tap((v) =>
          v.body.forEach((u) => {
            u.formattedName = this.commonService.getFormattedName(u);
          })
        )
      );
  }
}
