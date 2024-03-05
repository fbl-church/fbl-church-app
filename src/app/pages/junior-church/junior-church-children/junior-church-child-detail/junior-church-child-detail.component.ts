import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { AttendanceRecord, ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildAttendanceService } from 'src/service/attendance/child-attendance.service';
@Component({
  selector: 'app-junior-church-child-detail',
  templateUrl: './junior-church-child-detail.component.html',
})
export class JuniorChurchChildDetailComponent implements OnInit, OnDestroy {
  @ViewChild('childRecordDetailModal')
  childAttendanceDetailModal: ModalComponent;

  childData: Child;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  destroy = new Subject<void>();
  childRecordDataLoader: any;

  modalSelectedRecord: AttendanceRecord;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly childAttendanceService: ChildAttendanceService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.childData = res.child.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childRecordDataLoader = (params) => this.getChildAttendanceDataloader(params);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.back('/junior-church/children');
  }

  onChildDetailEditClick() {
    this.navigationService.navigate(`/children/${this.childData.id}/details/edit`);
  }

  getChildAttendanceDataloader(params?: Map<string, string[]>) {
    return this.childAttendanceService.getChildAttendanceRecordsByChildId(
      this.childData.id,
      params.set('group', [ChurchGroup.JUNIOR_CHURCH])
    );
  }

  onChildAttendanceRowClick(event: ChildAttendance) {
    this.modalSelectedRecord = event;
    this.childAttendanceDetailModal.open();
  }
}
