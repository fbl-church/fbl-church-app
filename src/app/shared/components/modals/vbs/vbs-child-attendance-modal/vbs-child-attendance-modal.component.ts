import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import {
  VBSAttendanceRecord,
  VBSChildAttendance,
  VBSChildPoint,
  VBSPoint,
} from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';
import { VBSChildPointsService } from 'src/service/vbs/vbs-child-points.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-child-attendance-modal',
  templateUrl: './vbs-child-attendance-modal.component.html',
})
export class VBSChildAttendanceModalComponent implements OnInit {
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChild('vbsChildAttendanceModal') modal: ModalComponent;

  @Input() vbsThemeId: any;
  @Input() record: VBSAttendanceRecord;
  @Output() childUpdated = new EventEmitter<void>();

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  childAttendance: VBSChildAttendance;

  modalLoading = false;
  registrationPoints: VBSPoint[] = [];
  groupPoints: VBSPoint[] = [];
  childPoints: any[] = [];

  constructor(
    private readonly vbsPointsService: VBSPointsService,
    private readonly vbsChildAttendanceService: VBSChildAttendanceService,
    private readonly vbsChildPointsService: VBSChildPointsService,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.modalLoading = true;
    this.vbsPointsService.getByThemeId(this.vbsThemeId).subscribe((res) => {
      const enabledPoints = res.body.filter((p) => p.enabled);
      this.registrationPoints = enabledPoints.filter((p) => p.registrationOnly && !p.checkInApply);
      this.groupPoints = enabledPoints.filter((p) => !p.registrationOnly && !p.checkInApply);
      this.modalLoading = false;
    });
  }

  open(c: VBSChildAttendance) {
    this.childAttendance = c;
    this.resetChildPoints();
    this.resetCheckBoxes();

    this.modal.open();
  }

  onCheckBoxUpdate(event: any) {
    if (event.selected) {
      this.childPoints.push(event.id);
    } else {
      this.childPoints.splice(this.childPoints.indexOf(event.id), 1);
    }
  }

  resetChildPoints() {
    this.childPoints = this.childAttendance.points.map((p) => p.vbsPointId);
  }

  resetCheckBoxes() {
    this.checkBoxes.forEach((c) => (c.checked = this.childPoints.includes(c.checkId)));
  }

  onUpdateClick() {
    this.modalLoading = true;
    this.vbsChildPointsService.updateChildPoints(this.childAttendance.id, this.buildVBSPoints()).subscribe({
      next: () => {
        this.childUpdated.emit();
        this.popupService.success(
          `Successfully updated points for '${this.commonService.getFormattedName(this.childAttendance)}'`
        );
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(
          `Unable to update points for '${this.commonService.getFormattedName(this.childAttendance)}' at this time.`
        );
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }

  onMarkChildAbsent() {
    this.modalLoading = true;
    this.vbsChildAttendanceService.markAbsent(this.childAttendance.id, this.record.id).subscribe({
      next: () => {
        this.childUpdated.emit();
        this.popupService.success(
          `${this.commonService.getFormattedName(this.childAttendance)} successfully removed from Attendance!`
        );
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(
          `Unable to remove '${this.commonService.getFormattedName(
            this.childAttendance
          )}' from attendance at this time!`
        );
        this.modalLoading = false;
      },
    });
  }

  buildVBSPoints(): VBSChildPoint[] {
    return this.childPoints.map((p) => ({ vbsPointId: p, vbsAttendanceId: this.childAttendance.attendanceRecordId }));
  }
}
