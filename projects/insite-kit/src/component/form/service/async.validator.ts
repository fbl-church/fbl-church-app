import { HttpResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { defaultIfEmpty, filter, first, map, switchMap } from 'rxjs/operators';

export const DEFAULT_ASYNC_VALIDATOR_DEBOUNCE = 750;

export function createValidator(
  validator: (control: AbstractControl) => Observable<ValidationErrors>,
  debounceTime = DEFAULT_ASYNC_VALIDATOR_DEBOUNCE
) {
  return (control: AbstractControl) => {
    return internalValidator(() => validator(control), debounceTime);
  };
}

export function createUniqueValidator(
  paramName: string,
  validator: (value: any) => Observable<HttpResponse<any>>,
  debounceTime = DEFAULT_ASYNC_VALIDATOR_DEBOUNCE
) {
  let originalValue;

  return (control: AbstractControl) => {
    if (control.pristine) {
      originalValue = control.value;
      return of(null);
    }

    if (originalValue === control.value) {
      return of(null);
    }

    return internalValidator(() => {
      return validator(control.value).pipe(
        filter((res) => !!res.body),
        map(() => ({ [paramName]: { value: control.value } }))
      );
    }, debounceTime);
  };
}

export function internalValidator(
  validator: () => Observable<ValidationErrors>,
  debounceTime = DEFAULT_ASYNC_VALIDATOR_DEBOUNCE
) {
  return timer(debounceTime, 1).pipe(
    first(),
    switchMap(() => validator()),
    defaultIfEmpty(null)
  );
}
