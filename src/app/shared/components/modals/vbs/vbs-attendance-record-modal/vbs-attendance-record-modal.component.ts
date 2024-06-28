import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';

@Component({
  selector: 'app-vbs-attendance-record-modal',
  templateUrl: './vbs-attendance-record-modal.component.html',
})
export class VBSAttendanceRecordModalComponent implements OnInit {
  @ViewChild('vbsAttendanceModal') modal: ModalComponent;
  @Input() theme: VBSTheme;

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  constructor(
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly commonService: CommonService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  open() {
    this.form.reset();
    this.form.patchValue({ activeDate: this.commonService.formatDate(new Date(), 'yyyy-MM-dd') });
    this.modal.open();
  }

  onSaveClick() {
    this.modalLoading = true;

    this.vbsAttendanceService.create(this.theme.id, this.buildVBSAttendanceData()).subscribe({
      next: (res) => {
        this.navigationService.navigate(`/vbs/themes/${res.vbsThemeId}/attendance/${res.id}`);
        this.popupService.success('VBS Attendance Record succesfully created!');
        this.modalLoading = false;
        this.modal.close();
      },

      error: () => {
        this.popupService.error('Unable to create VBS Attendance Record at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  buildVBSAttendanceData() {
    return {
      name: this.form.value.name.trim(),
      spiritTheme: this.form.value.spiritTheme ? this.form.value.spiritTheme.trim() : '',
      activeDate: this.form.value.activeDate,
      type: 'VBS',
    };
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      spiritTheme: [''],
      activeDate: ['', Validators.required],
    });
  }
}
