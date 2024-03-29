import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-delete-record-modal',
  templateUrl: './delete-record-modal.component.html',
})
export class DeleteRecordModalComponent {
  @ViewChild('deleteRecordModal') modal: ModalComponent;
  @Input() recordId: number;
  @Input() route: string;

  modalLoading = false;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService
  ) {}

  onDeleteUser() {
    this.modalLoading = true;
    this.attendanceRecordService.delete(this.recordId).subscribe({
      next: () => {
        this.modal.close();
        this.navigationService.navigate(this.route);
        this.popupService.success('Attendance Record Successfully Deleted!');
      },
      error: () => {
        this.popupService.error('Attendance could not be deleted at this time!');
        this.modalLoading = false;
      },
    });
  }
}
