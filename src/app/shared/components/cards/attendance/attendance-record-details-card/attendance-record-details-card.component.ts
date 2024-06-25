import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { UserAccess } from 'projects/insite-kit/src/model/user-access.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { Observable, Subject, iif, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-attendance-record-details-card',
  templateUrl: './attendance-record-details-card.component.html',
})
export class AttendanceRecordDetailsCardComponent implements OnChanges, OnDestroy {
  @Input() record: AttendanceRecord;

  startedByUser: User;
  closedByUser: User;
  WebRole = WebRole;
  destroy = new Subject<void>();

  loading = true;

  constructor(private readonly userService: UserService, private readonly userAccessService: UserAccessService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.record && changes.record.currentValue) {
      this.userAccessService.user$
        .pipe(
          switchMap((ua) => this.elevatedDataAccess(ua)),
          switchMap((id) => this.getUser(id)),
          tap((startedUser) => (this.startedByUser = startedUser)),
          switchMap(() => this.hasClosedByUser()),
          tap((closedUser) => (this.closedByUser = closedUser)),
          takeUntil(this.destroy)
        )
        .subscribe(() => (this.loading = false));
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  getUser(id: any): Observable<User> {
    return iif(() => !!id, this.userService.getById(id).pipe(map((res) => res.body)), of(null));
  }

  elevatedDataAccess(ua: UserAccess) {
    return iif(() => ua.hasRole(WebRole.ADMINISTRATOR), of(this.record.startedByUserId), of(null));
  }

  hasClosedByUser() {
    return iif(
      () => this.record.closedByUserId === this.record.startedByUserId,
      of(this.startedByUser),
      this.getUser(this.record.closedByUserId)
    );
  }
}
