import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildAttendanceService } from 'src/service/attendance/child-attendance.service';

@Component({
  selector: 'app-check-in-child-modal',
  templateUrl: './check-in-child-modal.component.html',
})
export class CheckInChildModalComponent implements OnInit {
  @ViewChild('childCheckInModal') modal: ModalComponent;
  @Input() recordId: number;
  @Output() childCheckedIn = new EventEmitter<void>();

  child: Child;
  modalLoading = false;
  form: FormGroup;

  constructor(
    private readonly childAttendanceService: ChildAttendanceService,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ notes: '' });
  }

  open(d: Child) {
    this.child = d;
    this.form.controls.notes.reset();
    this.modal.open();
  }

  onCheckInChild() {
    this.modalLoading = true;
    this.childAttendanceService
      .assignChildToRecord(this.recordId, this.child.id, this.form.value.notes)
      .subscribe({
        next: () => {
          this.childCheckedIn.emit();
          this.popupService.success(
            `${this.commonService.getFormattedName(
              this.child
            )} successfully checked in!`
          );
          this.modal.close();
          this.modalLoading = false;
        },
        error: () => {
          this.popupService.error(
            `Unable to check in '${this.commonService.getFormattedName(
              this.child
            )}' at this time!`
          );
          this.modal.close();
          this.modalLoading = false;
        },
      });
  }
}
