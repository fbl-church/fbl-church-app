import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
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
        next: () => (this.loading = false),
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

  onDeleteUser() {
    this.loading = true;
    this.userService.delete(this.userData.id).subscribe({
      next: () => {
        this.popupService.success('User Successfully Deleted!');
        this.router.navigate(['/users']);
        this.loading = false;
      },
      error: () => {
        this.popupService.success(
          'Unable to delete user at this time. Try again later'
        );
        this.loading = false;
      },
    });
  }
}
