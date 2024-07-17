import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, of, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/service/users/user.service';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-attendance-detail',
  templateUrl: './vbs-attendance-detail.component.html',
})
export class VBSAttendanceDetailComponent implements OnInit, OnDestroy {
  @ViewChild('vbsChildrenGrid') vbsChildrenGrid: GridComponent;

  attendanceRecord: VBSAttendanceRecord;
  vbsThemeId: number;
  loading = true;

  vbsWorkersDataloader: any;
  vbsChildrenDataloader: any;
  vbsOfferingWinnersDataloader: any;
  childGroups: ChurchGroup[];

  baseRoute: string;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly userService: UserService,
    private readonly vbsChildAttendacneService: VBSChildAttendanceService,
    private readonly vbsThemeService: VBSThemesService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.attendanceRecord = res.record.body)),
        tap((res) => (this.baseRoute = this.buildBaseRoute(res.route))),
        tap((res) => (this.childGroups = res.group)),
        tap(() => (this.vbsThemeId = this.attendanceRecord.vbsThemeId)),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.attendanceRecord.vbsThemeId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.vbsOfferingWinnersDataloader = () =>
          of(
            new HttpResponse({
              body: this.getFormattedOfferingWinners(res.body),
            })
          );

        this.vbsChildrenDataloader = (params) =>
          this.vbsChildAttendacneService.getVBSChildrenByAttendanceId(
            this.attendanceRecord.id,
            params.set('present', [true]).set('group', this.childGroups)
          );
        this.loading = false;
      });

    this.route.data
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data) =>
          (this.vbsWorkersDataloader = (params) => this.userService.getUsers(params.set('webRole', data.workerRoles)))
      );
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  refreshChildrenGrid() {
    this.vbsChildrenGrid.refresh();
  }

  onBackClick() {
    this.navigationService.navigate(this.baseRoute);
  }

  onEditClick() {
    this.navigationService.navigate(`${this.baseRoute}/attendance/${this.attendanceRecord.id}/edit`);
  }

  onCheckInChildrenClick() {
    this.navigationService.navigate(`${this.baseRoute}/attendance/${this.attendanceRecord.id}/children`);
  }

  getFormattedOfferingWinners(themeGroups: VBSThemeGroup[]) {
    const groups = themeGroups.filter((g) => this.attendanceRecord.offeringWinners.includes(g.group));
    groups.forEach((g) => (g.points = this.attendanceRecord.offeringWinnerPoints));
    return groups;
  }

  buildBaseRoute(path: string) {
    if (path && path.includes('themes')) {
      return `/vbs/themes/${this.attendanceRecord.vbsThemeId}`;
    } else {
      return path;
    }
  }
}
