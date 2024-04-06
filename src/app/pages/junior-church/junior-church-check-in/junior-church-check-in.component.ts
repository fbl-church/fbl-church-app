import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBefore, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { Access, App, ChurchGroup, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent implements OnInit {
  @ViewChild('juniorChurchScheduleDownloadModal') scheduleModal: ModalComponent;
  dataloader: any;

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  downloadLoading = false;
  downloadForm: FormGroup;

  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly navigationService: NavigationService,
    private readonly storageService: StorageService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastrService
  ) {
    this.dataloader = (params: any) =>
      this.attendanceRecordService.get(params.set('type', [ChurchGroup.JUNIOR_CHURCH]));
  }

  ngOnInit() {
    this.downloadForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.downloadForm.controls.startDate.valueChanges.subscribe((res) => {
      const parsedStartDate = parseISO(res);
      const parsedEndDate = parseISO(this.downloadForm.value.endDate);

      if (isBefore(parsedEndDate, parsedStartDate)) {
        this.downloadForm.controls.endDate.reset();
        this.toastService.warning('End date must be after the start date.');
      }
    });
  }

  onRowClick(event: AttendanceRecord) {
    this.navigationService.navigate(`/junior-church/check-in/${event.id}/details`);
  }

  onNewAttendanceRecord() {
    this.navigationService.navigate('/junior-church/new-record');
  }

  onJuniorChurchDownloadClick() {
    this.downloadLoading = true;
    this.scheduleModal.close();

    console.log(this.downloadForm.value);
    this.attendanceRecordService
      .downloadAttendanceSchedule(
        ChurchGroup.JUNIOR_CHURCH,
        this.downloadForm.value.startDate,
        this.downloadForm.value.endDate
      )
      .subscribe((res) => {
        this.downloadForm.reset();
        this.storageService.download(res, 'Junior Church Schedule.pdf');
        this.downloadLoading = false;
      });
  }
}
