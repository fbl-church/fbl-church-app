import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { UserAccess } from 'projects/insite-kit/src/model/user-access.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { Observable, Subject, iif, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-vbs-attendance-details-card',
  templateUrl: './vbs-attendance-details-card.component.html',
})
export class VBSAttendanceDetailsCardComponent implements OnChanges, OnDestroy {
  @Input() record: VBSAttendanceRecord;

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
