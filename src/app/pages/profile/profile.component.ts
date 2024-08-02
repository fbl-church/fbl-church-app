import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicModalComponent } from 'projects/insite-kit/src/component/modal/basic-modal.component';
import { ModalService } from 'projects/insite-kit/src/component/modal/modal.service';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { Child, Guardian, User } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User | Guardian;

  WebRole = WebRole;
  isGuardianOnly = false;
  destroy = new Subject<void>();

  leftColor: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.open(BasicModalComponent, {
      data: {
        title: 'Delete User?',
        type: 'danger',
        message:
          'Deleting this user will result in their account being marked as inactive and access to the app will be revoked. Do you want to continue?',
        actionRight: 'Delete User',
        actionLeft: 'Cancel',
      },
    });

    this.route.data
      .pipe(
        tap((res) => (this.currentUser = res.currentUser.body)),
        tap(() => this.guardianOnlyUser()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onEditClick() {
    this.navigationService.navigate('/profile/edit');
  }

  onResetPassword() {
    // this.navigationService.navigate('/profile/reset-password');
  }

  onChildRowClick(child: Child) {
    this.navigationService.navigate(`/profile/child/${child.id}`);
  }

  guardianOnlyUser() {
    this.isGuardianOnly = this.currentUser.webRole.includes(WebRole.GUARDIAN) && this.currentUser.webRole.length == 1;
  }
}
