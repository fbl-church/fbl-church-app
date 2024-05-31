import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from 'express';
import { AttendanceRecord, AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-attendance-record-detail-header',
  templateUrl: './attendance-record-detail-header.component.html',
})
export class AttendanceRecordDetailHeaderComponent {
  @Input() record: AttendanceRecord;
  @Input() route: string;
  @Input() app: Application;
  @Output() recordChange = new EventEmitter<AttendanceRecord>();
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
    this.attendanceRecordService.updateStatus(this.record.id, AttendanceStatus.ACTIVE).subscribe({
      next: () => {
        this.popupService.success('Attendance Record Successfully Activated! Start Check in!');
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
    this.attendanceRecordService.reopenAttendance(this.record.id).subscribe({
      next: (res) => {
        this.popupService.success('Attendance Record successfully Re-Opened!');
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
