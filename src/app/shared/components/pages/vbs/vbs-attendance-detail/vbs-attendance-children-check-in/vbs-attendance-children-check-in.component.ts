import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
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
  recordId: number;
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
    this.route.params
      .pipe(
        tap((p) => {
          this.recordId = p.attendanceId;
          this.vbsThemeId = p.id;
        }),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childrenDataloader = (params) =>
          this.attendanceRecordService.getAttendanceChildrenById(this.recordId, params.set('present', [false]));
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back(`/vbs/themes/${this.vbsThemeId}/attendance/${this.recordId}`);
  }

  onCancelClick() {
    this.onBackClick();
  }

  refreshGrid() {
    this.checkInGrid.refresh();
  }

  onNewChild() {
    this.navigationService.navigate('/junior-church/registration');
  }
}
