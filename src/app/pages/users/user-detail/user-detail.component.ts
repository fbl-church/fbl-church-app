import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BasicModalComponent } from 'projects/insite-kit/src/component/modal/basic-modal.component';
import { ModalService } from 'projects/insite-kit/src/component/modal/modal.service';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { AccountStatus, User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userData: User;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;
  editIcon = faPenToSquare;
  canEditRoles = false;
  canEditUser = false;

  destroy = new Subject<void>();
  qrCodeUrl = '';
  dataloader: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService,
    private readonly userService: UserService,
    private readonly modalService: ModalService
  ) {
    this.dataloader = (params: any) => this.getUserDataLoader(params);
  }

  getUserDataLoader(params?: Map<string, string[]>) {
    return this.userService.getUsers(params);
  }

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => {
          if (!res.user?.body || res.user.body.accountStatus !== AccountStatus.ACTIVE) {
            this.popupService.warning('User not found or is Inactive!');
            this.navigationService.navigate('/users');
          }
        }),
        tap((res) => (this.userData = res.user.body)),
        switchMap(() => this.userAccessService.user$),
        tap((ua) => (this.canEditUser = ua.canEditUser(this.userData.webRole))),
        tap(() => (this.canEditRoles = Number(this.jwt.getUserId()) !== this.userData.id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back('/users');
  }

  onEditClick() {
    this.navigationService.navigate(`/users/${this.userData.id}/details/edit`);
  }

  onDeleteUserClick() {
    const modalRef = this.modalService.open(BasicModalComponent, { data: this.deleteUserModalConfig() });
    modalRef.componentInstance.actionRight$
      .pipe(
        tap(() => (modalRef.componentInstance.loading = true)),
        switchMap(() => this.userService.delete(this.userData.id))
      )
      .subscribe(() => {
        this.userService.delete(this.userData.id).subscribe({
          next: () => {
            modalRef.close();
            modalRef.componentInstance.loading = false;
            this.popupService.success('User successfully marked inactive!');
            this.navigationService.navigate('/users');
          },
          error: () => {
            this.popupService.error('User could not be marked inactive at this time!');
            modalRef.componentInstance.loading = false;
          },
        });
      });
  }

  deleteUserModalConfig() {
    return {
      title: 'Delete User?',
      type: 'danger',
      message:
        'Deleting this user will result in their account being marked as inactive and access to the app will be revoked. Do you want to continue?',
      actionRight: 'Delete User',
      actionLeft: 'Cancel',
    };
  }
}
