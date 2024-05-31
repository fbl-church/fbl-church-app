import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { AttendanceRecord, ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildAttendanceService } from 'src/service/attendance/child-attendance.service';

@Component({
  selector: 'app-junior-church-update-child-attendance-modal',
  templateUrl: './update-child-attendance-modal.component.html',
})
export class JuniorChurchUpdateChildAttendanceModalComponent implements OnInit {
  @ViewChild('childCheckInModal') modal: ModalComponent;
  @Input() record: AttendanceRecord;
  @Output() childAttendanceUpdated = new EventEmitter<void>();

  child: ChildAttendance;
  modalLoading = false;
  form: FormGroup;

  constructor(
    private readonly childAttendanceService: ChildAttendanceService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ notes: '' });
  }

  open(d: ChildAttendance) {
    this.child = d;
    this.form.controls.notes.reset();
    this.form.controls.notes.patchValue(this.child.notes);
    this.modal.open();
  }

  onUpdateChildCheckIn() {
    this.modalLoading = true;
    this.childAttendanceService.updateChild(this.record.id, this.child.id, this.form.value.notes).subscribe({
      next: () => {
        this.childAttendanceUpdated.emit();
        this.popupService.success(`Notes for ${this.child.formattedName} successfully updated!`);
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(`Unable to update notes for ${this.child.formattedName} at this time!`);
        this.modalLoading = false;
      },
    });
  }

  onMarkChildAbsent() {
    this.modalLoading = true;
    this.childAttendanceService.removeChildFromRecord(this.record.id, this.child.id).subscribe({
      next: () => {
        this.childAttendanceUpdated.emit();
        this.popupService.success(`${this.child.formattedName} successfully removed from Attendance!`);
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(`Unable to remove '${this.child.formattedName}' from attendance at this time!`);
        this.modalLoading = false;
      },
    });
  }

  onChildCheckout() {
    this.modalLoading = true;
    this.childAttendanceService.checkOutChild(this.record.id, this.child.id).subscribe({
      next: () => {
        this.childAttendanceUpdated.emit();
        this.popupService.success(`${this.child.formattedName} successfully checked out!`);
        this.modal.close();
        this.modalLoading = false;
      },
      error: () => {
        this.popupService.error(`Unable to check out '${this.child.formattedName}' from attendance at this time!`);
        this.modalLoading = false;
      },
    });
  }
}
