import { Injectable } from '@angular/core';
import { default as churchGroupsJson } from 'projects/insite-kit/src/assets/translations/church-groups/en.json';
import { default as relationshipJson } from 'projects/insite-kit/src/assets/translations/relationships/en.json';
import { default as webRolesJson } from 'projects/insite-kit/src/assets/translations/web-roles/en.json';

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
  formatDate(value: Date | string): string {
    if (value === null) {
      return '-';
    }
    let dateValue;
    if (value instanceof Date) {
      dateValue = value;
    } else {
      dateValue = new Date(value);
    }

    const month =
      dateValue.getMonth() + 1 < 10
        ? `0${dateValue.getMonth() + 1}`
        : dateValue.getMonth() + 1;
    const day =
      dateValue.getDate() < 10
        ? `0${dateValue.getDate()}`
        : dateValue.getDate();
    const year = dateValue.getFullYear();

    return `${month}/${day}/${year}`;
  }

  formatPhoneNumber(value: string) {
    return `(${value.slice(0, 3)}) ${value.slice(4, 7)}-${value.slice(7, 10)}`;
  }

  /**
   * Returns the formatted web role based on the given enum.
   *
   * @param value The value to translate
   * @returns Formatted string
   */
  getFormattedRole(value: string) {
    const role = Object.values(webRolesJson)[0][value];
    return role ? role : '-';
  }

  /**
   * Returns the formatted church group based on the given enum.
   *
   * @param value The value to translate
   * @returns Formatted string
   */
  getFormattedChurchGroup(value: string) {
    const role = Object.values(churchGroupsJson)[0][value];
    return role ? role : '-';
  }

  /**
   * Returns the formatted relationship based on the given enum.
   *
   * @param value The value to translate
   * @returns Formatted string
   */
  getFormattedRelationship(value: string) {
    const role = Object.values(relationshipJson)[0][value];
    return role ? role : '-';
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
