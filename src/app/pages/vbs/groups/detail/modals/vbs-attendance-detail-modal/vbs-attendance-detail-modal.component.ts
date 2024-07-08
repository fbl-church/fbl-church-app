import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { WebRoleFeature } from 'projects/insite-kit/src/model/access.model';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';

@Component({
  selector: 'app-vbs-attendance-detail-modal',
  templateUrl: './vbs-attendance-detail-modal.component.html',
})
export class VBSAttendanceDetailModalComponent {
  @ViewChild('vbsAttendanceDetailModal') modal: ModalComponent;
  @Input() route: string;

  webRoleFeature: WebRoleFeature;
  record: VBSAttendanceRecord;

  constructor(private readonly navigationService: NavigationService) {}

  open(r: VBSAttendanceRecord) {
    this.record = r;
    this.modal.open();
  }

  onCheckInClick() {
    this.modal.close();
    this.navigationService.navigate(`${this.route}/attendance/${this.record.id}`);
  }

  onChildrenPointsClick() {
    this.modal.close();
    this.navigationService.navigate(`${this.route}/attendance/${this.record.id}/children/points`);
  }
}
