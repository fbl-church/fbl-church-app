import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-vbs-attendance-children-check-in',
  templateUrl: './vbs-attendance-children-check-in.component.html',
})
export class VBSAttendanceChildrenCheckInComponent implements OnInit, OnDestroy {
  @ViewChild('childrenCheckInGrid') checkInGrid: GridComponent;

  vbsThemeId: number;
  childGroups: ChurchGroup[];
  record: VBSAttendanceRecord;
  baseRoute: string;

  destroy = new Subject<void>();
  loading = true;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  childrenDataloader: any;
  modalChildSelection: Child;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((data) => {
          this.record = data.record.body;
          this.vbsThemeId = this.record.vbsThemeId;
          this.childGroups = data.group;
        }),
        tap((res) => (this.baseRoute = this.buildBaseRoute(res.route))),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childrenDataloader = this.getChildAttendanceDataloader();
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back(`${this.baseRoute}/attendance/${this.record.id}`);
  }

  onCancelClick() {
    this.onBackClick();
  }

  refreshGrid() {
    this.checkInGrid.refresh();
  }

  onNewChild() {
    this.navigationService.navigate('/vbs/registration');
  }

  getChildAttendanceDataloader() {
    return (params) =>
      this.attendanceRecordService.getAttendanceChildrenById(
        this.record.id,
        params.set('present', [false]).set('group', this.childGroups)
      );
  }

  buildBaseRoute(path: string) {
    if (path && path.includes('themes')) {
      return `/vbs/themes/${this.record.vbsThemeId}`;
    } else {
      return path;
    }
  }
}
