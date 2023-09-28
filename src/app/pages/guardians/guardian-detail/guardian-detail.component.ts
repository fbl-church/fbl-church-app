import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-guardian-detail',
  templateUrl: './guardian-detail.component.html',
})
export class GuardianDetailComponent implements OnInit {
  guardianData: Guardian;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  canEditGuardian = false;
  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly jwt: JwtService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.guardianData = res.guardian.body)),
        tap(() => this.canUserEditGuardian()),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/guardians']);
  }

  onEditClick() {
    this.router.navigate([`/guardians/${this.guardianData.id}/details/edit`]);
  }

  onChildRowClick(event: Child) {
    this.router.navigate([`/children/${event.id}/details`]);
  }

  canUserEditGuardian() {
    this.canEditGuardian =
      this.jwt.hasWebRole(WebRole.ADMINISTRATOR, WebRole.SITE_ADMINISTRATOR) ||
      this.jwt.isGuardianOnlyUser(this.guardianData);
  }
}
