import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import {
  Application,
  WebRoleApp,
} from 'projects/insite-kit/src/model/access.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { ApplicationService } from 'src/service/access-manager/application.service';
import { WebRoleAppUpdateModalComponent } from './modals/web-role-app-update-modal/web-role-app-update-modal.component';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
  @ViewChild(WebRoleAppUpdateModalComponent)
  webRoleAppModal: WebRoleAppUpdateModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  application: Application;
  destroy = new Subject<void>();
  webRoleAppDataloader: any;

  loading = false;

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.application.body),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.application = res;
        this.webRoleAppDataloader = (params) =>
          this.applicationService.getWebRoleAppAccessById(
            this.application.id,
            params
          );
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/access-manager/applications']);
  }

  onWebRoleAppUpdated() {
    this.grid.refresh();
  }

  onRowClick(event: WebRoleApp) {
    this.webRoleAppModal.open(event);
  }

  onEnabledUpdateClick(enabled: boolean) {
    this.loading = true;
    this.applicationService
      .updateEnabledFlag(this.application.id, enabled)
      .subscribe({
        next: (res) => {
          this.application.enabled = res.enabled;
          this.popupService.success(
            `Application '${
              this.application.formattedName
            }' has been successfully ${enabled ? 'ENABLED' : 'DISABLED'}`
          );
          this.loading = false;
        },
        error: () => {
          this.popupService.success(
            `Could not ${enabled ? 'ENABLE' : 'DISABLE'} application '${
              this.application.formattedName
            }' at this time.`
          );
          this.loading = false;
        },
      });
  }
}
