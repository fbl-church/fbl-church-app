import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<AttendanceRecord>();

  workers: any[];
  form: FormGroup;
  destroy = new Subject<void>();

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
        this.record
          ? this.record.name
          : `Junior Church - ${this.commonService.formatDate(
              new Date(),
              'MM/dd/yyyy'
            )}`,
      ],
      activeDate: [
        this.record
          ? this.record.activeDate
          : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      workers: [
        this.record ? this.record.workers.map((v) => v.id) : [],
        Validators.required,
      ],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    const newRecord: AttendanceRecord = {
      name: this.form.value.name,
      type: ChurchGroup.JUNIOR_CHURCH,
      workers: this.form.value.workers.map((w) => {
        return { id: w };
      }),
      activeDate: this.form.value.activeDate,
    };
    this.save.emit(newRecord);
  }
}
