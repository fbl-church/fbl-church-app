import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControlName, ValidationErrors } from '@angular/forms';
import { default as formErrorMessages } from 'projects/insite-kit/src/assets/translations/form/en.json';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  getErrorTranslation(key: string, errorName: string) {
    const errorMessages = Object.values(formErrorMessages)[0];

    if (errorMessages[errorName]) {
      return errorMessages[errorName][key];
    } else {
      return null;
    }
  }

  /**
   * Determines if a control has the required validator.
   * @param control The control to check
   */
  isRequired(control: AbstractControl): boolean {
    if (!control) {
      return false;
    }

    if (!control.validator) {
      return false;
    }

    const errors = control.validator({} as any);

    if (errors && (errors.required || this.hasCustomRequiredValidator(errors))) {
      return true;
    }

    if (!control['controls']) {
      return false;
    }

    for (const controlName in control['controls']) {
      if (!control['controls'][controlName]) {
        continue;
      }

      if (this.isRequired(control['controls'][controlName])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Indicates if a validation errors object has a custom required validator.
   * @param errors The validation errors.
   */
  hasCustomRequiredValidator(errors: ValidationErrors): boolean {
    if (!errors) {
      return;
    }

    // Check if the key name ends with "Required"
    return !!Object.keys(errors).find((key) => key.endsWith('Required'));
  }

  /**
   * Gets an error for a control
   * @param control The control
   * @param errorType The type of error to get
   */
  getError(control: AbstractControl | FormControlName, errorType: string): any {
    return control && control.errors ? control.errors[errorType] : null;
  }

  /**
   * Determines if an error message should be displayed for a control
   * @param control The control to check
   * @param errorType The type of error
   */
  shouldShowError(control: AbstractControlDirective | AbstractControl | FormControlName, errorType?: string): boolean {
    control = control instanceof AbstractControlDirective ? control.control : control;
    let shouldShowError = !!control && !!control.errors && control.dirty;

    if (errorType) {
      shouldShowError = shouldShowError && !!control.errors[errorType];
    }

    return shouldShowError;
  }

  /**
   * Sets the errors on a given control and ensures error messages show if the control is invalid.
   * @param control The control.
   * @param errors The errors.
   * @param path The optional path to the control to set the errors on.
   */
  setErrors(control: AbstractControl, errors: any, path?: (string | number)[] | string): void {
    errors = control.errors ? { ...control.errors, ...errors } : errors;

    // Remove keys with falsy values
    Object.keys(errors)
      .filter((key) => !errors[key])
      .forEach((key) => delete errors[key]);

    // Use null if there's no keys left because en empty object will trigger errors
    errors = Object.keys(errors).length ? errors : null;

    if (path) {
      control = control.get(path);
    }

    control.setErrors(errors);

    if (errors) {
      // Ensure the validation messages show
      control.markAsDirty();
    }
  }

  /**
   * Indicates if a value is empty.
   * @param value The value.
   * @param path The optional path to get the value from.
   */
  isValueEmpty(value: AbstractControl | any, path?: string): boolean {
    value = this.getValue(value, path);
    // Using value.length allows a check that works for string and array values
    return value === null || value === undefined || value.length === 0;
  }

  /**
   * Gets a value from a control or object using an optional path.
   * @param value The value.
   * @param path The optional path to get the value from.
   */
  getValue(value: AbstractControl | any, path?: string): any {
    if (value instanceof AbstractControl) {
      const control = value;
      value = control.value;
    }

    return path ? this.getValueFromPath(value, path) : value;
  }

  /**
   * Gets the child control that corresponds to the path property set on this validator.
   * @param control The control.
   * @param path The path to the control to get.
   */
  getControlAtPath(control: AbstractControl, path?: (string | number)[] | string): AbstractControl {
    return path ? control.get(path) : control;
  }

  /**
   * Gets the value from an object at the given path. Allows values to be retrieved from nested objects.
   *
   * obj - the object to get a value from
   * path - the path to get the value from
   */
  getValueFromPath(obj: any, path: string): any {
    const arr = path.split('.');

    if (obj == null) {
      obj = {};
    }

    if (arr.length > 1) {
      return this.getValueFromPath(obj[arr[0]], path.substring(path.indexOf('.') + 1));
    } else {
      return obj[path];
    }
  }
}
