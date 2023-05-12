import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/clubber.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-gurdian-detail',
  templateUrl: './gurdian-detail.component.html',
})
export class GurdianDetailComponent implements OnInit {
  gurdianData: Gurdian;
  loading = true;

  Feature = Feature;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();

  constructor(
    private gurdianService: GurdianService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.gurdianService.getById(res.id)),
        tap((res) => (this.gurdianData = res.body)),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load gurdian details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/gurdians']);
  }
}
