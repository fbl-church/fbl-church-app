import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
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

  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.guardianData = res.guardian.body)),
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
}
