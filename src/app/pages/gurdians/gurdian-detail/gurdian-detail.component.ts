import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-gurdian-detail',
  templateUrl: './gurdian-detail.component.html',
})
export class GurdianDetailComponent implements OnInit {
  gurdianData: Gurdian;
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
        tap((res) => (this.gurdianData = res.gurdian.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate(['/gurdians']);
  }

  onEditClick() {
    this.router.navigate([`/gurdians/${this.gurdianData.id}/details/edit`]);
  }
}
