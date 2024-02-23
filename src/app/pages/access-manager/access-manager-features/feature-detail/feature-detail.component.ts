import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Feature, WebRoleFeature } from 'projects/insite-kit/src/model/access.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FeatureService } from 'src/service/access-manager/feature.service';
import { WebRoleFeatureUpdateModalComponent } from './modals/web-role-feature-update-modal/web-role-feature-update-modal.component';

@Component({
  selector: 'app-feature-detail',
  templateUrl: './feature-detail.component.html',
})
export class FeatureDetailComponent implements OnInit, OnDestroy {
  @ViewChild(WebRoleFeatureUpdateModalComponent)
  webRoleFeatureModal: WebRoleFeatureUpdateModalComponent;
  @ViewChild('webRoleFeaturesGrid') webRoleFeaturesGrid: GridComponent;

  feature: Feature;
  webRoleFeaturesDataloader: any;
  featureId: number;

  destroy = new Subject<void>();
  loading = false;

  constructor(
    private readonly featureService: FeatureService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((p) => (this.featureId = p.id)),
        switchMap(() => this.route.data),
        tap((res) => (this.feature = res.feature.body)),
        takeUntil(this.destroy)
      )
      .subscribe(
        () =>
          (this.webRoleFeaturesDataloader = (params) =>
            this.featureService.getWebRoleFeatureAccessById(this.featureId, params))
      );
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back('/access-manager/features');
  }

  onRowClick(event: WebRoleFeature) {
    this.webRoleFeatureModal.open(event);
  }

  onWebRoleFeatureUpdated() {
    this.webRoleFeaturesGrid.refresh();
  }

  onEnabledUpdateClick(enabled: boolean) {
    this.loading = true;
    this.featureService.updateEnabledFlag(this.feature.id, enabled).subscribe({
      next: (res) => {
        this.feature.enabled = res.enabled;
        this.popupService.success(
          `Feature '${`${this.feature.app}.${this.feature.feature}`}' has been successfully ${
            enabled ? 'ENABLED' : 'DISABLED'
          }`
        );
        this.loading = false;
      },
      error: () => {
        this.popupService.success(
          `Could not ${
            enabled ? 'ENABLE' : 'DISABLE'
          } feature '${`${this.feature.app}.${this.feature.feature}`}' at this time.`
        );
        this.loading = false;
      },
    });
  }
}
