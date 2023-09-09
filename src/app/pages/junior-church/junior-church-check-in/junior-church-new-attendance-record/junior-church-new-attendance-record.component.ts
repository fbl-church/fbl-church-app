import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectInputComponent } from 'projects/insite-kit/src/component/multiselect/multi-select-input.component';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, takeUntil } from 'rxjs';
import { AttendanceRecordsService } from 'src/service/attendance/attendance-records.service';

@Component({
  selector: 'app-new-junior-church-new-attendance-record',
  templateUrl: './junior-church-new-attendance-record.component.html',
})
export class JuniorChurchNewAttendanceRecordComponent
  implements OnInit, OnDestroy
{
  @ViewChild(MultiSelectInputComponent)
  workerSelection: MultiSelectInputComponent;
  form: FormGroup;
  destroy = new Subject<void>();
  workers: any[];
  loading = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly attendanceService: AttendanceRecordsService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.workers.body),
        takeUntil(this.destroy)
      )
      .subscribe((workers: any[]) => {
        this.workers = workers.map((w) => {
          return { value: w.id, name: w.formattedName };
        });
        this.buildForm();
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        `Junior Church - ${this.commonService.formatDate(
          new Date(),
          'MM/dd/yyyy'
        )}`,
      ],
      activeDate: [
        this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      workers: ['', Validators.required],
    });
  }

  onBackClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onCancelClick() {
    this.onBackClick();
  }

  onSaveClick() {
    this.loading = true;
    const newRecord: AttendanceRecord = {
      name: this.form.value.name,
      type: ChurchGroup.JUNIOR_CHURCH,
      workers: this.form.value.workers.map((w) => {
        return { id: w };
      }),
      activeDate: this.form.value.activeDate,
    };

    this.attendanceService.create(newRecord).subscribe({
      next: (res) => {
        this.popupService.success(
          'Junior Church Attendance Record Successfully Created!'
        );
        this.router.navigate([`/junior-church/check-in/${res.id}/details`]);
        this.loading = false;
      },
      error: () => {
        this.popupService.error(
          'Unable to create Junior Church Attendance Record. Try again later.'
        );
        this.loading = false;
      },
    });
  }
}
