import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserRoleSelectionGridComponent } from 'src/app/shared/components/cards/user-role-selection-grid/user-role-selection-grid.component';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-edit-user-roles',
  templateUrl: './edit-user-roles.component.html',
})
export class EditUserRolesComponent implements OnInit, OnDestroy {
  @ViewChild(UserRoleSelectionGridComponent)
  userRoleSelectionGrid: UserRoleSelectionGridComponent;

  loading = true;
  destroy = new Subject<void>();
  userUpdating: User;
  userId: number;
  disableSave = false;
  disableWebRoleUpdate = false;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params
      .pipe(
        tap((p) => (this.userId = p.id)),
        switchMap(() => this.route.data),
        map((res) => res.user.body),
        takeUntil(this.destroy)
      )
      .subscribe((child) => {
        this.userUpdating = child;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.resetStatus();
    this.location.back();
  }

  onUpdateClick() {
    this.loading = true;
    this.disableSave = true;

    this.userService
      .updateUserRolesById(
        this.userId,
        this.userRoleSelectionGrid.getSelectedRoles()
      )
      .subscribe({
        next: (res) => {
          this.popupService.success('User Roles successfully updated!');
          this.resetStatus();
          this.router.navigate([`/users/${this.userId}/details`]);
        },
        error: () => {
          this.popupService.error(
            'Unable to update user roles at this time. Try again later.'
          );
          this.resetStatus();
        },
      });
  }

  resetStatus() {
    this.loading = false;
    this.disableSave = false;
  }

  validGurdians(gurdians: any[]): boolean {
    if (gurdians.length < 1) {
      this.popupService.error(
        'Child is required to have at least one gurdian assigned to them.'
      );
      return false;
    }

    if (gurdians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected gurdians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
