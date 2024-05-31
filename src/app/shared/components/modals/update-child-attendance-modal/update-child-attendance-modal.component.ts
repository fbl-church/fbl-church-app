import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { DropdownItem } from 'projects/insite-kit/src/component/select/dropdown-item.model';
import { SingleSelectInputComponent } from 'projects/insite-kit/src/component/select/select.component';
import {
  AttendanceRecord,
  AttendanceStatus,
  ChildAttendance,
} from 'projects/insite-kit/src/model/attendance-record.model';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildAttendanceService } from 'src/service/attendance/child-attendance.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-update-child-attendance-modal',
  templateUrl: './update-child-attendance-modal.component.html',
})
export class UpdateChildAttendanceModalComponent implements OnInit {
  @ViewChild('childCheckInModal') modal: ModalComponent;
  @ViewChild(SingleSelectInputComponent) singleSelect: SingleSelectInputComponent;
  @Input() record: AttendanceRecord;
  @Output() childAttendanceUpdated = new EventEmitter<void>();

  child: ChildAttendance;
  modalLoading = false;
  form: FormGroup;

  guardianPickup: DropdownItem[] = [];

  constructor(
    private readonly childAttendanceService: ChildAttendanceService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly guardianService: GuardianService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ notes: '', pickedUpBy: null });
  }

  open(d: ChildAttendance) {
    this.child = d;

    this.setGuardianPickup();

    this.form.controls.notes.reset();
    this.form.controls.pickedUpBy.reset();
    this.form.controls.notes.patchValue(this.child.notes);
    this.modal.open();
  }

  onUpdateChildCheckIn() {
    this.modalLoading = true;
    const pickedUpById = this.form.value?.pickedUpBy ? this.form.value.pickedUpBy.value : null;
    this.childAttendanceService
      .updateChild(this.record.id, this.child.id, this.form.value.notes, pickedUpById)
      .subscribe({
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
    const pickedUpById = this.form.value?.pickedUpBy ? this.form.value.pickedUpBy.value : null;
    this.childAttendanceService.checkOutChild(this.record.id, this.child.id, pickedUpById).subscribe({
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

  setGuardianPickup() {
    if (this.record.status !== AttendanceStatus.CLOSED) {
      this.guardianPickup = [];
      this.singleSelect.value = null;

      this.guardianService.getGuardiansByChildId(this.child.id).subscribe((res) => {
        const guardiansCanPickUp: DropdownItem[] = res.body.map((g) => {
          return {
            name: `${this.commonService.getFormattedName(g)} (${this.commonService.translate(
              g.relationship,
              TranslationKey.RELATIONSHIP
            )})`,
            value: g.id,
          };
        });

        this.guardianPickup = [{ name: 'None', value: null }, ...guardiansCanPickUp];
        if (this.child.guardianPickedUpId) {
          this.form.controls.pickedUpBy.patchValue(
            this.guardianPickup.find((g) => g.value === this.child.guardianPickedUpId)
          );
        }
      });
    }
  }
}
