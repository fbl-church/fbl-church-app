import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'projects/insite-kit/src/model/access.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { ApplicationService } from 'src/service/access-manager/application.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
  application: Application;
  destroy = new Subject<void>();

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
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/access-manager/applications']);
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
