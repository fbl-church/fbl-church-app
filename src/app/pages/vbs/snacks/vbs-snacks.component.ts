import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSTheme, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { combineLatest, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-snacks',
  templateUrl: './vbs-snacks.component.html',
})
export class VBSSnacksComponent implements OnInit, OnDestroy {
  @ViewChild('attendanceDetailsModal') attendanceDetailsModal: ModalComponent;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  themeData: VBSTheme;
  vbsAttendanceDataloader: any;
  vbsThemeGroupsDataloader: any;
  destroy = new Subject<void>();
  loading = true;
  modalLoading = false;

  activeRecord: VBSAttendanceRecord;

  prePrimaryCount: number;
  primaryCount: number;
  middlerCount: number;
  juniorCount: number;
  totalRecordChildren: number;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly vbsThemeService: VBSThemesService,
    private readonly vbsChildAttendanceService: VBSChildAttendanceService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.theme.body),
        tap((res) => (this.themeData = res)),
        switchMap(() => this.vbsAttendanceService.getByThemeId(this.themeData.id)),
        tap((res) => (this.vbsAttendanceDataloader = () => of(res))),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.themeData.id)),
        tap((res) => (this.vbsThemeGroupsDataloader = () => of(res))),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onGroupRowClick(event: VBSThemeGroup) {
    this.navigationService.navigate(`/vbs/snacks/children/${event.group}/allergies`);
  }

  onAttendanceRecordRowClick(event: VBSAttendanceRecord) {
    this.attendanceDetailsModal.open();
    this.activeRecord = event;
    this.modalLoading = true;

    combineLatest([
      this.getGroupAttendanceCount(event.id, ChurchGroup.VBS_PRE_PRIMARY),
      this.getGroupAttendanceCount(event.id, ChurchGroup.VBS_PRIMARY),
      this.getGroupAttendanceCount(event.id, ChurchGroup.VBS_MIDDLER),
      this.getGroupAttendanceCount(event.id, ChurchGroup.VBS_JUNIOR),
    ]).subscribe(([prePrimary, primary, middler, junior]) => {
      this.prePrimaryCount = prePrimary;
      this.primaryCount = primary;
      this.middlerCount = middler;
      this.juniorCount = junior;
      this.totalRecordChildren = prePrimary + primary + middler + junior;
      this.modalLoading = false;
    });
  }

  getGroupAttendanceCount(attendanceId: any, group: ChurchGroup) {
    return this.vbsChildAttendanceService
      .getVBSChildrenByAttendanceId(
        attendanceId,
        new Map().set('present', [true]).set('group', group).set('pageSize', ['1']).set('rowOffset', ['0'])
      )
      .pipe(map((res) => (res.headers.get('total-count') ? Number(res.headers.get('total-count')) : 0)));
  }
}
