import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from 'express';
import { AttendanceRecord, AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';

@Component({
  selector: 'app-vbs-attendance-detail-header',
  templateUrl: './vbs-attendance-detail-header.component.html',
})
export class VBSAttendanceDetailHeaderComponent {
  @Input() record: VBSAttendanceRecord;
  @Input() route: string;
  @Input() app: Application;
  @Output() recordChange = new EventEmitter<VBSAttendanceRecord>();
  @Output() checkInStarted = new EventEmitter<void>();
  @Output() backClick = new EventEmitter<void>();

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  loading = false;
  reopenLoading = false;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly popupService: PopupService
  ) {}

  onBackClick() {
    this.backClick.emit();
  }

  onRecordClosed(event: AttendanceRecord) {
    this.recordChange.emit(event);
  }

  onStartCheckIn() {
    this.loading = true;
    this.vbsAttendanceService.updateStatus(this.record.id, AttendanceStatus.ACTIVE).subscribe({
      next: () => {
        this.popupService.success('VBS Attendance Record Successfully Activated! Start Check in!');
        this.checkInStarted.emit();
        this.loading = false;
      },
      error: () => {
        this.popupService.error('Unable to Start Check in. Try again later.');
        this.loading = false;
      },
    });
  }

  onReopenAttendance() {
    this.reopenLoading = true;
    this.vbsAttendanceService.reopenAttendance(this.record.id).subscribe({
      next: (res) => {
        this.popupService.success('VBS Attendance Record successfully Re-Opened!');
        this.recordChange.emit(res);
        this.reopenLoading = false;
      },
      error: () => {
        this.popupService.error('Unable to Re-Open Attendance Record at this time. Try again later.');
        this.reopenLoading = false;
      },
    });
  }
}
