import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, of, switchMap, takeUntil, tap } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { UserService } from 'src/service/users/user.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-attendance-detail',
  templateUrl: './vbs-attendance-detail.component.html',
})
export class VBSAttendanceDetailComponent implements OnInit, OnDestroy {
  attendanceRecord: VBSAttendanceRecord;
  vbsThemeId: number;
  loading = true;

  vbsWorkersDataloader: any;
  vbsChildrenDataloader: any;
  vbsOfferingWinnersDataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly userService: UserService,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly vbsThemeService: VBSThemesService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.attendanceRecord = res.record.body)),
        tap(() => (this.vbsThemeId = this.attendanceRecord.vbsThemeId)),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.attendanceRecord.vbsThemeId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.vbsOfferingWinnersDataloader = () =>
          of(
            new HttpResponse({
              body: this.getFormattedOfferingWinners(this.attendanceRecord.offeringWinners, res.body),
            })
          );
        this.loading = false;
      });

    this.route.data
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data) =>
          (this.vbsWorkersDataloader = (params) => this.userService.getUsers(params.set('webRole', data.workerRoles)))
      );

    this.route.params
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res) =>
          (this.vbsChildrenDataloader = (params) =>
            this.attendanceRecordService.getAttendanceChildrenById(res.attendanceId, params.set('present', [true])))
      );
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.navigate(`/vbs/themes/${this.vbsThemeId}`);
  }

  onEditClick() {
    this.navigationService.navigate(
      `/vbs/themes/${this.attendanceRecord.vbsThemeId}/attendance/${this.attendanceRecord.id}/edit`
    );
  }

  getFormattedOfferingWinners(winners: ChurchGroup[], themeGroups: VBSThemeGroup[]) {
    return themeGroups.filter((g) => winners.includes(g.group));
  }
}
