import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { AttendanceRecord, AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-close-attendance-record-modal',
  templateUrl: './close-attendance-record-modal.component.html',
})
export class CloseAttendanceRecordModalComponent {
  @ViewChild('closeRecordModal') modal: ModalComponent;
  @Input() recordId: number;
  @Output() closed = new EventEmitter<AttendanceRecord>();

  modalLoading = false;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService
  ) {}

  onDeleteUser() {
    this.modalLoading = true;
    this.attendanceRecordService.updateStatus(this.recordId, AttendanceStatus.CLOSED).subscribe({
      next: (res) => {
        this.modal.close();
        this.popupService.success('Attendance Record successfully Closed!');
        this.closed.emit(res);
      },
      error: () => {
        this.modal.close();
        this.popupService.error('Unable to close Attendance Record at this time. Try again later.');
        this.modalLoading = false;
      },
    });
  }
}
