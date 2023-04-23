import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ClubberService } from 'src/service/clubbers/clubber.service';

@Component({
  selector: 'app-clubber-detail',
  templateUrl: './clubber-detail.component.html',
})
export class ClubberDetailComponent implements OnInit {
  clubberData: Clubber;
  loading = true;

  destroy = new Subject<void>();
  constructor(
    private readonly clubberService: ClubberService,
    private readonly activeRoute: ActivatedRoute,
    private readonly popupService: PopupService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((res) => this.clubberService.getById(res.id)),
        tap((res) => (this.clubberData = res.body)),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.onBackClick();
          this.popupService.error(
            'Could not load clubber details at this time. Try again later.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/clubbers']);
  }
}
