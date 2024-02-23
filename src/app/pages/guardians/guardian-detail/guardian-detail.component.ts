import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { UserAccess } from 'projects/insite-kit/src/model/user-access.model';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { UserAccessService } from 'projects/insite-kit/src/service/auth/user-access.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-guardian-detail',
  templateUrl: './guardian-detail.component.html',
})
export class GuardianDetailComponent implements OnInit, OnDestroy {
  guardianData: Guardian;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  canEditGuardian = false;
  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly jwt: JwtService,
    private readonly userAccessService: UserAccessService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.guardianData = res.guardian.body)),
        switchMap(() => this.userAccessService.user$),
        tap((res) => this.canUserEditGuardian(res)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back('/guardians');
  }

  onEditClick() {
    this.navigationService.navigate(`/guardians/${this.guardianData.id}/details/edit`);
  }

  onChildRowClick(event: Child) {
    this.navigationService.navigate(`/children/${event.id}/details`);
  }

  canUserEditGuardian(ua: UserAccess) {
    this.canEditGuardian =
      ua.hasRole(WebRole.ADMINISTRATOR, WebRole.SITE_ADMINISTRATOR) || this.jwt.isGuardianOnlyUser(this.guardianData);
  }
}
