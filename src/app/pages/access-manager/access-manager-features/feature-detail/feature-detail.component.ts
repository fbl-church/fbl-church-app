import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import {
  Feature,
  WebRoleFeature,
} from 'projects/insite-kit/src/model/access.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FeatureService } from 'src/service/access-manager/feature.service';
import { WebRoleFeatureUpdateModalComponent } from './modals/web-role-feature-update-modal/web-role-feature-update-modal.component';

@Component({
  selector: 'app-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
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
    private readonly router: Router,
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
            this.featureService.getWebRoleFeatureAccessById(
              this.featureId,
              params
            ))
      );
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/access-manager/features']);
  }

  onRowClick(event: WebRoleFeature) {
    this.webRoleFeatureModal.open(event);
  }

  onWebRoleFeatureUpdated() {
    this.webRoleFeaturesGrid.refresh();
  }
}
