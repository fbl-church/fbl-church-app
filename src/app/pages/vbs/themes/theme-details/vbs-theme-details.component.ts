import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSPoint, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Observable, Subject, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { VBSPointsModalComponent } from 'src/app/shared/components/modals/vbs/vbs-points-modal/vbs-points-modal.component';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';
import { VBSReportsService } from 'src/service/vbs/vbs-report.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-theme-details',
  templateUrl: './vbs-theme-details.component.html',
  styleUrls: ['./vbs-theme-details.component.scss'],
})
export class VBSThemeDetailsComponent implements OnInit {
  @ViewChild(ModalComponent) deleteModal: ModalComponent;
  @ViewChild('vbsPointsGrid') vbsPointsGrid: GridComponent;
  @ViewChild('vbsThemeGroupsGrid') vbsThemeGroupsGrid: GridComponent;
  @ViewChild('vbsPointsDetailModal') vbsPointsDetailModal: VBSPointsModalComponent;
  @ViewChild('vbsCreatePointsModal') vbsCreatePointsModal: VBSPointsModalComponent;

  destroy = new Subject<void>();
  loading = true;
  deleteModalLoading = false;
  themeData: VBSTheme;
  vbsChildrenStats: any;
  vbsAttendanceDataloader: any;
  vbsPointsDataloader: any;
  vbsThemeGroupsDataloader: any;
  vbsThemeId: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vbsReportsService: VBSReportsService,
    private readonly navigationService: NavigationService,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly vbsThemeService: VBSThemesService,
    private readonly popupService: PopupService,
    private readonly vbsPointsService: VBSPointsService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((res) => res.theme.body),
        tap((res) => (this.themeData = res)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));

    this.route.params
      .pipe(
        tap((res) => (this.vbsThemeId = res.id)),
        switchMap(() => this.vbsReportsService.getChildrenStats(this.vbsThemeId)),
        tap((res) => (this.vbsChildrenStats = res.body)),
        switchMap(() => this.vbsAttendanceService.getByThemeId(this.vbsThemeId)),
        tap((res) => (this.vbsAttendanceDataloader = () => of(res))),
        switchMap(() => this.vbsPointsService.getByThemeId(this.vbsThemeId)),
        tap((res) => (this.vbsPointsDataloader = () => of(res))),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.vbsThemeId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vbsThemeGroupsDataloader = () => of(res)));
  }

  onBackClick() {
    this.navigationService.navigate('/vbs/themes');
  }

  onAttendanceRecordRowClick(event: VBSAttendanceRecord) {
    this.navigationService.navigate(`/vbs/themes/${this.vbsThemeId}/attendance/${event.id}`);
  }

  onUpdatePoints(event: VBSPoint) {
    this.onSaveUpdate(this.vbsPointsService.update(event.id, event), this.vbsPointsDetailModal, 'update');
  }

  onSavePoints(event: VBSPoint) {
    this.onSaveUpdate(this.vbsPointsService.create(this.vbsThemeId, [event]), this.vbsCreatePointsModal, 'create');
  }

  onDeleteTheme() {
    this.deleteModalLoading = true;
    this.vbsThemeService.delete(this.vbsThemeId).subscribe({
      next: (res) => {
        this.deleteModal.close();
        this.popupService.success('VBS Theme Successfully Deleted!');
        this.navigationService.navigate('/vbs/themes');
      },
      error: () => {
        this.deleteModal.close();
        this.popupService.error('Unable to delete VBS Theme. Try again later.');

        this.deleteModalLoading = false;
      },
    });
  }

  onPointsDeleted() {
    this.refreshPointsGrid().subscribe((res) => {
      this.vbsPointsDataloader = () => of(res);
      this.vbsPointsGrid.loading = false;
    });
  }

  refreshPointsGrid() {
    this.vbsPointsGrid.loading = true;
    return this.vbsPointsService.getByThemeId(this.vbsThemeId);
  }

  refreshVBSThemeGroups() {
    this.vbsThemeGroupsGrid.loading = true;
    this.vbsThemeService.getGroupsByThemeId(this.vbsThemeId).subscribe((res) => {
      this.vbsThemeGroupsDataloader = () => of(res);
      this.vbsThemeGroupsGrid.loading = false;
    });
  }

  onSaveUpdate(dataObservable: Observable<any>, modal: VBSPointsModalComponent, statusText: string) {
    const pastTenseText = statusText === 'create' ? 'Created' : 'Updated';

    dataObservable
      .pipe(
        tap(() => modal.close()),
        switchMap(() => this.refreshPointsGrid())
      )
      .subscribe({
        next: (res) => {
          this.vbsPointsDataloader = () => of(res);
          this.popupService.success(`Point Value succesfully ${pastTenseText}!`);
          this.vbsPointsGrid.loading = false;
        },
        error: () => {
          this.popupService.error(`Unable to ${statusText} Point Value at this time. Try again later.`);
          this.vbsPointsGrid.loading = false;
        },
      });
  }
}
