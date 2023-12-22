import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { UrlService } from 'projects/insite-kit/src/service/url-service/url.service';
import { Subject, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-profile-child-details',
  templateUrl: './profile-child-details.component.html',
})
export class ProfileChildDetailsComponent implements OnInit, OnDestroy {
  childData: Child;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  destroy = new Subject<void>();
  qrCodeUrl = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly urlService: UrlService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.childData = res.child.body)),
        tap(() => (this.qrCodeUrl = `${this.urlService.getSiteUrl()}/children/${this.childData.id}/details`)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate([`/profile`]);
  }

  onChildDetailEditClick() {
    this.router.navigate([`/profile/child/${this.childData.id}/edit`]);
  }
}
