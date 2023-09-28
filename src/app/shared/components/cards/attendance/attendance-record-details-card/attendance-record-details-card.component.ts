import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import {
  Observable,
  Subject,
  iif,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-attendance-record-details-card',
  templateUrl: './attendance-record-details-card.component.html',
})
export class AttendanceRecordDetailsCardComponent
  implements OnChanges, OnDestroy
{
  @Input() record: AttendanceRecord;

  startedByUser: User;
  closedByUser: User;
  WebRole = WebRole;
  destroy = new Subject<void>();

  loading = true;

  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.record && changes.record.currentValue) {
      if (this.jwt.hasWebRole(WebRole.ADMINISTRATOR)) {
        of(this.record.startedByUserId)
          .pipe(
            switchMap((id) => this.getUser(id)),
            tap((startedUser) => (this.startedByUser = startedUser)),
            switchMap(() => this.getUser(this.record.closedByUserId)),
            tap((closedUser) => (this.closedByUser = closedUser)),
            takeUntil(this.destroy)
          )
          .subscribe(() => (this.loading = false));
      } else {
        this.loading = false;
      }
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  getUser(id: any): Observable<User> {
    return iif(
      () => !!id,
      this.userService.getUserById(id).pipe(map((res) => res.body)),
      of(null)
    );
  }
}
