import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-vbs-attendance-detail',
  templateUrl: './vbs-attendance-detail.component.html',
})
export class VBSAttendanceDetailComponent implements OnInit, OnDestroy {
  userData: User;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  editIcon = faPenToSquare;
  canEditRoles = false;
  canEditUser = false;

  destroy = new Subject<void>();
  qrCodeUrl = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.userData = res.user.body)),
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
}
