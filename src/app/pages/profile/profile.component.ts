import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { Gurdian, User } from 'projects/insite-kit/src/model/user.model';
import { Subject, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User | Gurdian;

  WebRole = WebRole;
  isGurdianOnly = false;
  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.currentUser = res.currentUser.body)),
        tap(() => this.gurdianOnlyUser()),
        takeUntil(this.destroy)
      )
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onEditClick() {
    this.router.navigate(['/profile/edit']);
  }

  onResetPassword() {
    this.router.navigate(['/profile/reset-password']);
  }

  gurdianOnlyUser() {
    this.isGurdianOnly =
      this.currentUser.webRole.includes(WebRole.GURDIAN) &&
      this.currentUser.webRole.length == 1;
  }
}
