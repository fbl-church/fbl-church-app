import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WebRoleFeature } from 'projects/insite-kit/src/model/access.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-attendance-check-in-modal',
  templateUrl: './vbs-attendance-check-in-modal.component.html',
})
export class VBSAttendanceCheckInModalComponent implements OnInit {
  @ViewChildren(CheckboxComponent) checkBoxes: QueryList<CheckboxComponent>;
  @ViewChild('vbsAttendanceCheckInModal') modal: ModalComponent;

  @Input() vbsThemeId: any;
  @Input() recordId: number;
  @Output() childCheckedIn = new EventEmitter<void>();

  webRoleFeature: WebRoleFeature;

  modalLoading = false;
  autoApplyPoints: VBSPoint[] = [];
  registrationPoints: VBSPoint[] = [];
  groupPoints: VBSPoint[] = [];
  child: Child;

  childPoints: number[] = [];

  constructor(
    private readonly vbsPointsService: VBSPointsService,
    private readonly vbsChildAttendanceService: VBSChildAttendanceService,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.modalLoading = true;
    this.vbsPointsService.getByThemeId(this.vbsThemeId).subscribe((res) => {
      const enabledPoints = res.body.filter((p) => p.enabled);
      this.registrationPoints = enabledPoints.filter((p) => p.registrationOnly && !p.checkInApply);
      this.autoApplyPoints = enabledPoints.filter((p) => p.checkInApply);
      this.groupPoints = enabledPoints.filter((p) => !p.registrationOnly && !p.checkInApply);
      this.modalLoading = false;
    });
  }

  open(c: Child) {
    this.child = c;
    this.resetCheckBoxes();
    this.resetChildPoints();
    this.modal.open();
  }

  onCheckBoxUpdate(event: any) {
    if (event.selected) {
      this.childPoints.push(event.id);
    } else {
      this.childPoints.splice(this.childPoints.indexOf(event.id), 1);
    }
  }

  onCheckIn() {
    this.modalLoading = true;
    this.vbsChildAttendanceService.checkIn(this.child.id, this.recordId, this.childPoints).subscribe({
      next: () => {
        this.childCheckedIn.emit();
        this.popupService.success(`${this.commonService.getFormattedName(this.child)} successfully checked in!`);
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(
          `Unable to check in '${this.commonService.getFormattedName(this.child)}' at this time!`
        );
        this.modal.close();
        this.modalLoading = false;
      },
    });
  }

  resetCheckBoxes() {
    this.checkBoxes.forEach((c) => (c.checked = false));
  }

  resetChildPoints() {
    this.childPoints = [];

    for (const p of this.autoApplyPoints) {
      this.childPoints.push(p.id);
    }
  }
}
