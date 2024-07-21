import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-snacks-details',
  templateUrl: './vbs-snacks-details.component.html',
  styleUrls: ['./vbs-snacks-details.component.scss'],
})
export class VBSSnacksDetailsComponent implements OnInit, OnDestroy {
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  record: VBSAttendanceRecord;
  vbsAttendanceDataloader: any;
  totalRecordChildren: number;
  vbsThemeGroupsDataloader: any;
  destroy = new Subject<void>();
  loading = true;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly vbsChildAttendanceService: VBSChildAttendanceService,
    private readonly vbsThemeService: VBSThemesService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.record = res.record.body)),
        switchMap(() =>
          this.vbsChildAttendanceService.getVBSChildrenByAttendanceId(this.record.id, new Map().set('present', [true]))
        ),
        tap((res) => (this.totalRecordChildren = Number(res.headers.get('total-count')))),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.navigate(`/vbs/snacks`);
  }
}
