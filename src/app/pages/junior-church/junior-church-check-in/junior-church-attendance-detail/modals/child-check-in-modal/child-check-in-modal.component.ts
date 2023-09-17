import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-child-check-in-modal',
  templateUrl: './child-check-in-modal.component.html',
})
export class ChildCheckInModalComponent implements OnInit {
  @ViewChild('childCheckInModal') modal: ModalComponent;

  child: Child;
  modalLoading = false;
  form: FormGroup;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly router: Router,
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

  onCheckInChild() {}
}
