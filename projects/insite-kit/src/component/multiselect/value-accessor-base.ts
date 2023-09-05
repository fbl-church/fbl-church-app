import { ControlValueAccessor } from '@angular/forms';

/**
 * Abstract class for creating custom input elements.
 * Correctly implements the ControlValueAccessor interface for
 * a generic type.
 */
export abstract class DeprecatedValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;
  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach((f) => f(value));
    }
  }

  /**
   * The input has been touched.
   */
  touch(): void {
    this.touched.forEach((f) => f());
  }

  /**
   * Sets the given value to the input's inner value.
   * @param value - new value
   */
  writeValue(value: T): void {
    this.innerValue = value;
  }

  /**
   * Registers an onChange function that will be called when the input value changes.
   * @param fn - onChange function
   */
  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  /**
   * Registers an onTouch fucntion that will be called when the input is first touched.
   * @param fn - onTouch function
   */
  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
