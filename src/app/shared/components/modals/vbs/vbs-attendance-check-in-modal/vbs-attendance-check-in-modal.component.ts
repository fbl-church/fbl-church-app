import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckboxComponent } from 'projects/insite-kit/src/component/checkbox/checkbox.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WebRoleFeature } from 'projects/insite-kit/src/model/access.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-attendance-check-in-modal',
  templateUrl: './vbs-attendance-check-in-modal.component.html',
})
export class VBSAttendanceCheckInModalComponent implements OnInit {
  @ViewChild('vbsAttendanceCheckInModal') modal: ModalComponent;
  @ViewChild('fieldCreate') createField: CheckboxComponent;
  @ViewChild('fieldRead') readField: CheckboxComponent;
  @ViewChild('fieldUpdate') updateField: CheckboxComponent;
  @ViewChild('fieldDelete') deleteField: CheckboxComponent;
  @Output() childCheckedIn = new EventEmitter<void>();
  @Input() vbsThemeId: any;

  webRoleFeature: WebRoleFeature;

  modalLoading = false;
  vbsPoints: VBSPoint[] = [];
  child: Child;

  constructor(private readonly vbsPointsService: VBSPointsService) {}

  ngOnInit() {
    this.modalLoading = true;
    this.vbsPointsService.getByThemeId(this.vbsThemeId).subscribe((res) => {
      this.vbsPoints = res.body.filter((p) => p.registrationOnly && !p.checkInApply);
      this.modalLoading = false;
    });
  }

  open(c: Child) {
    this.child = c;
    this.modal.open();
  }

  onCheckBoxUpdate(event: any) {
    console.log(event);
  }

  onCheckIn() {}
}
