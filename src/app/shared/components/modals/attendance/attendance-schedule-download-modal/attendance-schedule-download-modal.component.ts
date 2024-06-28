import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBefore, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { ChurchGroup, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-attendance-schedule-download-modal',
  templateUrl: './attendance-schedule-download-modal.component.html',
})
export class AttendanceScheduleDownloadModalComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  @Input() type: ChurchGroup = ChurchGroup.JUNIOR_CHURCH;

  typeTranslation: string;
  title = '';
  savedGuardianData: Guardian;
  downloadForm: FormGroup;
  downloadLoading = false;
  disableDownload = false;

  constructor(
    private readonly storageService: StorageService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.typeTranslation = this.commonService.translate(this.type, TranslationKey.CHURCH_GROUP);
    this.title = `Download ${this.typeTranslation} Schedule`;

    this.downloadForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.downloadForm.controls.startDate.valueChanges.subscribe((res) => {
      if (this.isEndDateBeforeStartDate(res, this.downloadForm.value.endDate)) {
        this.downloadForm.controls.endDate.reset();
        this.toastService.warning('End date must be after the start date.');
      }
    });
  }

  open() {
    this.downloadLoading = false;
    this.downloadForm.reset();
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  isEndDateBeforeStartDate(start: any, end: any) {
    const parsedStartDate = parseISO(start);
    const parsedEndDate = parseISO(end);
    return isBefore(parsedEndDate, parsedStartDate);
  }

  onAttendanceScheduleDownloadClick() {
    this.downloadLoading = true;

    if (this.isEndDateBeforeStartDate(this.downloadForm.value.startDate, this.downloadForm.value.endDate)) {
      this.toastService.error('End date must be after the start date.');
      this.downloadLoading = false;
      return;
    }

    this.attendanceRecordService
      .downloadAttendanceSchedule(this.type, this.downloadForm.value.startDate, this.downloadForm.value.endDate)
      .subscribe({
        next: (res) => {
          this.toastService.success(`Download Complete for ${this.typeTranslation} Attendance Record!`);
          this.storageService.download(res, `${this.typeTranslation} Schedule.pdf`);
          this.close();
          this.downloadLoading = false;
        },
        error: (err) => {
          this.toastService.error(`Unable to download ${this.typeTranslation} Attendance Record. Try again later.`);
          this.downloadLoading = false;
        },
      });
  }
}
