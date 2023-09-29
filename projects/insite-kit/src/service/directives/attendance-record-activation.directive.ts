import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  AttendanceRecord,
  AttendanceStatus,
} from '../../model/attendance-record.model';
import { CommonService } from '../common/common.service';

@Directive({
  selector: '[attendanceRecordActivation]',
})
export class AttendanceRecordActivationDirective {
  canActivateRecord: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private readonly commonService: CommonService
  ) {}

  @Input() set attendanceRecordActivation(record: AttendanceRecord) {
    this.canActivateRecord = false;
    if (record) {
      const currentDate = this.commonService.formatDate(
        new Date(),
        'yyyy-MM-dd'
      );
      if (record.activeDate === currentDate) {
        this.canActivateRecord = record.status === AttendanceStatus.PENDING;
      }
    }

    this.updateView();
  }

  private updateView() {
    if (this.canActivateRecord) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
