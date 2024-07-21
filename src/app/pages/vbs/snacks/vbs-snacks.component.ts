import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';
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
  totalRecordChildren: number;

  constructor(
    private readonly childrenService: ChildrenService,
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

  onAttendanceRecordRowClick(event: VBSAttendanceRecord) {
    this.attendanceDetailsModal.open();
    this.activeRecord = event;
    this.modalLoading = true;
    this.vbsChildAttendanceService
      .getVBSChildrenByAttendanceId(event.id, new Map().set('present', [true]))
      .subscribe((res) => {
        this.totalRecordChildren = res.headers.get('total-count') ? Number(res.headers.get('total-count')) : 0;
        this.modalLoading = false;
      });
  }
}
