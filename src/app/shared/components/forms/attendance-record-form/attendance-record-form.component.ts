import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceRecord } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-attendance-record-form',
  templateUrl: './attendance-record-form.component.html',
})
export class AttendanceRecordFormComponent implements OnInit, OnDestroy {
  @Input() record: AttendanceRecord;
  @Input() group: ChurchGroup;
  @Input() translation: string;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Input() workersRequired = true;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<AttendanceRecord>();

  workers: any[];
  form: FormGroup;
  destroy = new Subject<void>();
  ChurchGroup = ChurchGroup;

  constructor(
    private readonly commonService: CommonService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
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
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        this.record ? this.record.name : `${this.translation} ${this.group === ChurchGroup.NURSERY ? '(SS)' : ''}`,
        Validators.required,
      ],
      radio: true,
      activeDate: [
        this.record ? this.record.activeDate : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      unitSession: [this.record?.unitSession ? this.record.unitSession : ''],
      workers: [this.record ? this.record.workers.map((v) => v.id) : []],
    });

    if (this.workersRequired) {
      this.form.controls.workers.addValidators(Validators.required);
    }

    this.onTypeChange();
  }

  onTypeChange() {
    this.form.controls.radio.valueChanges.subscribe((v) => {
      if (this.group === ChurchGroup.NURSERY) {
        this.form.patchValue({
          name: `${this.translation} (${v ? 'SS' : 'AM'})`,
        });
      }
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    const newRecord: AttendanceRecord = {
      name: this.form.value.name.trim(),
      type: this.group,
      unitSession: this.form.value.unitSession,
      activeDate: this.form.value.activeDate,
    };

    if (this.form.value.workers && this.form.value.workers.length > 0) {
      newRecord.workers = this.form.value.workers.map((w) => {
        return { id: w };
      });
    }
    this.save.emit(newRecord);
  }
}
