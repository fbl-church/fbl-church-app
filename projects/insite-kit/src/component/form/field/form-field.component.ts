import { AfterContentInit, Component, ContentChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';
import { FormService } from '../service/form.service';

/**
 * Component for displaying form input fields.
 */
@Component({
  selector: 'ik-form-field',
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent implements AfterContentInit {
  @Input() header: string;
  @Input() padding = true;
  @Input() errorKey: string;
  @ContentChild(FormControlName, { read: ElementRef })
  controlElement: ElementRef;
  @ContentChild(FormControlName) formControl: FormControlName;

  constructor(protected renderer: Renderer2, protected formService: FormService) {}

  /**
   * Called after the content is initialized
   */
  ngAfterContentInit(): void {
    if (this.controlElement) {
      this.setupControlElement();
    }
  }

  /**
   * Adds attributes and styles to the control element to prepare it for use in a form.
   */
  setupControlElement(): void {
    this.renderer.addClass(this.controlElement.nativeElement, 'form--control');
    this.renderer.setAttribute(this.controlElement.nativeElement, 'id', this.getControlName());
    this.renderer.setAttribute(this.controlElement.nativeElement, 'name', this.getControlName());
  }

  /**
   * Gets the control.
   */
  getControl(): AbstractControl {
    return this.formControl ? this.formControl.control : null;
  }

  /**
   * Gets the control name.
   */
  getControlName(): string | null {
    return this.formControl ? this.formControl.name.toString() : null;
  }

  /**
   *  Gets the error control name
   */
  getErrorControlName(): string | null {
    if (this.errorKey) {
      return this.errorKey;
    }
    return this.getControlName();
  }

  /**
   * Gets the control path.
   */
  getControlPath(): string[] {
    return this.formControl ? this.formControl.path : null;
  }

  /**
   * Gets the error message for a given error.
   * @param error The error
   */
  getErrorMessage(error): string {
    return this.formService.getErrorTranslation(error.key, this.getErrorControlName());
  }

  /**
   * Gets the label.
   */
  getLabel(): string {
    return this.formService.isRequired(this.getControl()) ? `${this.header}*` : this.header;
  }

  /**
   * Indicates if an error should be shown.
   * Updates the status of the field.
   */
  shouldShowError(): boolean {
    return this.formService.shouldShowError(this.getControl());
  }
}
