import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';

@Component({
  selector: 'app-new-junior-church-new-attendance-record',
  templateUrl: './junior-church-new-attendance-record.component.html',
})
export class JuniorChurchNewAttendanceRecordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        `Junior Church Attendance - ${this.commonService.formatDate(
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

  onCancelClick() {}

  onSaveClick() {}
}
