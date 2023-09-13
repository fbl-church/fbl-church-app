import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateMapping, TranslationKey } from '../../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * Will return the copied object of it's own instance.
   *
   * @param obj The object to be copied
   * @returns new object instance
   */
  copyObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Formats the given date object or string. The default format being used is month/day/year.
   *
   * @param value The value to be formatted.
   * @returns The formatted string.
   */
  formatDate(value: Date | string, format: string = 'MM/dd/yyyy'): string {
    if (value === null) {
      return '-';
    }
    let dateValue;
    if (value instanceof Date) {
      dateValue = value;
    } else {
      dateValue = new Date(value);
    }

    return new DatePipe('en-US').transform(dateValue, format);
  }

  formatPhoneNumber(value: string) {
    return `(${value.slice(0, 3)}) ${value.slice(4, 7)}-${value.slice(7, 10)}`;
  }

  /**
   * Translates the key value to its mapped translation
   *
   * @param value The value to translate
   * @returns Translated string
   */
  translate(value: string, key: TranslationKey) {
    const v = Object.values(TranslateMapping[key])[0][value];
    return v ? v : '-';
  }

  /**
   * Formats the users name into a first name and last name basis.
   *
   * @param user The user object to be formatted.
   * @returns String of the formatted name.
   */
  getFormattedName(user: any): string {
    if (user.lastName) {
      return `${user.firstName} ${user.lastName}`.trim();
    } else {
      return `${user.firstName}`.trim();
    }
  }
}
