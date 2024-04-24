import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, takeUntil } from 'rxjs';
import { UserAccess } from '../../model/user-access.model';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccessService implements OnDestroy {
  private userInitializing = true;
  private readonly destroyed = new Subject<void>();
  private readonly _user: BehaviorSubject<UserAccess | null> = new BehaviorSubject(null);
  readonly user$: Observable<UserAccess | null> = this._user.asObservable().pipe(filter(() => !this.userInitializing));

  constructor(private readonly jwt: JwtService, private readonly authService: AuthService) {
    if (this.jwt.isAuthenticated()) {
      this.authService
        .userAccess()
        .pipe(takeUntil(this.destroyed))
        .subscribe((user: UserAccess) => {
          this.userInitializing = false;
          this._user.next(user ? new UserAccess(user) : null);
        });
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
