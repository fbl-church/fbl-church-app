import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userData: User;
  loading = true;

  destroy = new Subject<void>();
  constructor(
    private userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.userService.getUserById(res.id)),
        tap((res) => (this.userData = res.body)),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: (res) => (this.loading = false),
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load user details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/users']);
  }
}
