import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AttendanceRecordsService } from './attendance-records.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceRecordResolverService implements Resolve<any> {
  constructor(private attendanceRecordService: AttendanceRecordsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.attendanceRecordService.getById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
