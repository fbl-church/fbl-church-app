import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { DropdownItem } from '../../component/select/dropdown-item.model';
import { Enum, TranslateMapping, TranslationKey } from '../../model/common.model';

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
  formatDate(value: Date | string, format = 'MM/dd/yyyy', zone?: string): string {
    if (value === null) {
      return '-';
    }

    let dateValue;
    if (value instanceof Date) {
      dateValue = value;
    } else {
      dateValue = new Date(value);
    }

    return new DatePipe('en-US', zone).transform(dateValue, format);
  }

  formatPhoneNumber(value: string) {
    let newVal = value ? value.replace(/\D/g, '') : '';

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    return newVal;
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
   * Gets a list of dropdown items based on the passed in enum.
   *
   * @param enumType The type of enum to get the types for
   * @param translationKey The translation key for the enum
   * @param exclude Optional param if specific enum types should be excluded
   * @returns List of dropdown items
   */
  getDropDownItems(enumType: Enum, translationKey: TranslationKey, exclude?: any[]): DropdownItem[] {
    return Object.keys(enumType)
      .filter((v) => (exclude ? exclude.includes(enumType[v]) : true))
      .map((cg) => {
        return {
          value: cg,
          name: this.translate(cg, translationKey),
        };
      });
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
