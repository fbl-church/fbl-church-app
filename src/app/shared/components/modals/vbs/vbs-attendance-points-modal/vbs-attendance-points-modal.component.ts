import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { VBSChildAttendance, VBSChildPoint, VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSChildPointsService } from 'src/service/vbs/vbs-child-points.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-attendance-points-modal',
  templateUrl: './vbs-attendance-points-modal.component.html',
})
export class VBSAttendancePointsModalComponent implements OnInit {
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChild('vbsChildAttendancePointsModal') modal: ModalComponent;

  @Input() vbsThemeId: any;
  @Output() pointsUpdated = new EventEmitter<void>();

  modalLoading = false;

  currentChildAttendance: VBSChildAttendance;
  childPoints: any[] = [];
  groupPoints: VBSPoint[] = [];
  modalDirty = false;

  constructor(
    private readonly vbsPointsService: VBSPointsService,
    private readonly vbsChildPointsService: VBSChildPointsService,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.modalLoading = true;
    this.vbsPointsService.getByThemeId(this.vbsThemeId).subscribe((res) => {
      this.groupPoints = res.body.filter((p) => !p.registrationOnly && !p.checkInApply);
      this.modalLoading = false;
    });
  }

  open(childAttendance: VBSChildAttendance) {
    this.modalDirty = false;
    this.modalLoading = false;

    this.currentChildAttendance = childAttendance;
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
    this.modalDirty = true;
  }

  resetChildPoints() {
    this.childPoints = this.currentChildAttendance.points.map((p) => p.vbsPointId);
  }

  resetCheckBoxes() {
    this.checkBoxes.forEach((c) => (c.checked = this.childPoints.includes(c.checkId)));
  }

  close() {
    this.modal.close();
  }

  onUpdatePointsClick() {
    this.modalLoading = true;
    this.vbsChildPointsService.updateChildPoints(this.currentChildAttendance.id, this.buildVBSPoints()).subscribe({
      next: () => {
        this.pointsUpdated.emit();
        this.popupService.success(
          `Successfully updated points for '${this.commonService.getFormattedName(this.currentChildAttendance)}'`
        );
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(
          `Unable to update points for '${this.commonService.getFormattedName(
            this.currentChildAttendance
          )}' at this time.`
        );
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }

  buildVBSPoints(): VBSChildPoint[] {
    return this.childPoints.map((p) => ({
      vbsPointId: p,
      vbsAttendanceId: this.currentChildAttendance.attendanceRecordId,
    }));
  }
}
