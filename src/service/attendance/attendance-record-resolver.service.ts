import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AttendanceRecordService } from './attendance-records.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceRecordResolverService {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly commonService: CommonService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.attendanceRecordService.getById(route.params.id).pipe(
      tap((v) =>
        v.body.workers.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
        })
      ),
      catchError(() => {
        return of(null);
      })
    );
  }
}
