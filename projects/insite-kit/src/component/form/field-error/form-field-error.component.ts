import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormService } from '../service/form.service';

/**
 * Component for displaying form field errors
 */
@Component({
  selector: 'ik-form-field-error',
  templateUrl: './form-field-error.component.html',
})
export class FormFieldErrorComponent implements OnDestroy, OnInit {
  @Input() type: string;
  @Input() controlPath: (string | number)[] | string;
  @Input() message: string;
  control: AbstractControl;
  errorVisible: boolean;

  private readonly destroy = new Subject<void>();

  constructor(private form: FormGroupDirective, private formService: FormService) {}

  /**
   * Destroy component
   */
  ngOnDestroy() {
    this.destroy.next();
  }

  /**
   * Called after the view is initialized.
   */
  ngOnInit(): void {
    this.control = this.form.control.get(this.controlPath);
    this.updateStatus();
    this.control.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => this.updateStatus());
  }

  /**
   * Updates the status.
   */
  updateStatus() {
    this.errorVisible = this.formService.shouldShowError(this.control, this.type);
  }
}
