import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-vbs-attendance-children-points',
  templateUrl: './vbs-attendance-children-points.component.html',
})
export class VBSAttendanceChildrenPointsComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  activeRote: string;

  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap((res) => (this.activeRote = res.route)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.navigate(this.activeRote);
  }
}
