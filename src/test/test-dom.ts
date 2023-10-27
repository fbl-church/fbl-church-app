import { DebugElement, ElementRef } from '@angular/core';

export class TestDOM {
  static querySelector(selector: string | Element | ElementRef | DebugElement): Element {
    let element = selector as any;
    if (typeof selector === 'string') {
      element = document.querySelector(selector);
    } else if (selector instanceof DebugElement || selector instanceof ElementRef) {
      element = selector.nativeElement;
    }
    return element;
  }

  static querySelectorAll(selector: string | Element | ElementRef | DebugElement): Element[] {
    let element = selector as any;
    if (typeof selector === 'string') {
      element = document.querySelectorAll(selector);
    } else if (selector instanceof DebugElement || selector instanceof ElementRef) {
      element = selector.nativeElement;
    }
    return element;
  }

  static exists(selector: string | HTMLElement | ElementRef | DebugElement): boolean {
    return !!this.querySelector(selector);
  }
  static textContent(selector: string | Element | HTMLElement | ElementRef | DebugElement): string {
    const element = this.querySelector(selector);
    return element ? element.textContent.trim() : '';
  }
  static href(selector: string | HTMLElement | ElementRef | DebugElement): string {
    const element = this.querySelector(selector) as HTMLAnchorElement;
    const origin = window.location.origin;
    // don't include leading slash of url
    return element && element.href ? element.href.substr(origin.length + 1) : '';
  }

  static routerLink(selector: string | HTMLElement | ElementRef | DebugElement): string {
    const element = this.querySelector(selector);
    let url = element ? element.getAttribute('routerLink') : '';
    if (!url) {
      url = element ? element.getAttribute('ng-reflect-router-link') : '';
    }
    if (!url) {
      return '/' + this.href(selector);
    }
    return url;
  }

  static updateForm(selector: string | HTMLElement | ElementRef | DebugElement, value: { [key: string]: any }): void {
    let form = this.querySelector(selector) as HTMLFormElement;
    if (!form) {
      // eslint-disable-next-line
      console.warn(`Could not find the form "${selector}"`);
      return;
    }

    Object.keys(value)
      .filter((key) => {
        const hasField = !!form.elements[key];
        if (!hasField) {
          // eslint-disable-next-line
          console.warn(`Could not find the form field "${key}"`);
        }
        return hasField;
      })
      .forEach((key) => this.updateFormField(form.elements[key], value[key]));
  }

  static updateFormField(selector: string | HTMLElement | ElementRef | DebugElement, value: any): void {
    let formElement = this.querySelector(selector) as HTMLFormElement;
    if (!formElement) {
      // eslint-disable-next-line
      console.warn(`Could not find the form field "${selector}"`);
      return;
    }
    if (formElement instanceof RadioNodeList) {
      formElement = this.findRadioButton(formElement, value);
    }
    formElement.dispatchEvent(new Event('focus', { bubbles: true }));
    // Update the form field based on the type of input.
    // It would be too convenient if the DOM used the same "value" property for all inputs :p
    if (formElement.type === 'checkbox' || formElement.type === 'radio') {
      formElement.checked = value;
    } else {
      formElement.value = value;
    }
    formElement.dispatchEvent(new Event('input', { bubbles: true }));
    formElement.dispatchEvent(new Event('input', { bubbles: true }));
    // Handle elements, like the select element, that don't raise "input" events since the user can't type into them
    formElement.dispatchEvent(new Event('change', { bubbles: true }));
    formElement.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  static formFieldValue(selector: string | HTMLElement | ElementRef | DebugElement): any {
    const formElement = this.querySelector(selector) as HTMLFormElement;
    if (!formElement) {
      return null;
    }
    // It would be too convenient if the DOM used the same "value" property for all inputs :p
    if (formElement.type === 'checkbox' || formElement.type === 'radio') {
      return formElement.checked;
    }
    return formElement.value;
  }

  static findRadioButton(radioList: RadioNodeList, value: any): HTMLFormElement {
    let formElement;
    radioList.forEach((radioElement: HTMLFormElement) => {
      // <input type="radio" value="10" /> uses "value" attribute
      // <input type="radio" [value]="10" /> uses "ng-reflect-value" attribute
      const radioValue = radioElement.getAttribute('ng-reflect-value') || radioElement.getAttribute('value');
      if (radioValue === value) {
        formElement = radioElement;
      }
    });
    if (!formElement) {
      // eslint-disable-next-line
      console.warn(`Could not find the radio element with the value "${value}"`);
    }
    return formElement;
  }

  static click(selector: string | Element | ElementRef | DebugElement): void {
    const element = this.querySelector(selector);
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }

  static dispatchEvent(
    selector: string | Element | ElementRef | DebugElement,
    eventType: string,
    options?: MouseEventInit
  ): Event {
    const element = this.querySelector(selector);
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    options = {
      bubbles: true,
      cancelable: true,
      ...options,
    };
    const event = new Event(eventType, options);
    element.dispatchEvent(event);
    return event;
  }

  static isEnabled(selector: string | Element | NodeList | ElementRef | DebugElement): boolean {
    // Handle lists
    if (selector instanceof NodeList) {
      let areAllEnabled = true;
      selector.forEach((node: Element) => {
        areAllEnabled = areAllEnabled && this.isEnabled(node);
      });
      return areAllEnabled;
    }
    const element = this.querySelector(selector);
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    return !element['disabled'];
  }

  static selectComplexValueByIndex(index: number): string {
    // Angular uses this string format to determine the index of the complex object array that's stored internally
    // So "10: Object" selects the complex object at index "10".
    return `${index}: Object`;
  }
  static getSelectedComplexValueIndex(selector: string | Element | ElementRef | DebugElement): number {
    // Angular uses this string format to determine the index of the complex object array that's stored internally
    // So "10: Object" selects the complex object at index "10".
    const element = this.querySelector(selector) as HTMLFormElement;
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    const complexValueIndex = element.value.split(':')[0];
    return parseInt(complexValueIndex, 10);
  }

  static toggleChecklist(
    checklistSelector: string | Element | ElementRef | DebugElement,
    indexesToToggle: number[]
  ): void {
    const checklist = this.querySelector(checklistSelector);
    if (!checklist) {
      // eslint-disable-next-line
      console.warn(`Could not find the checklist ${checklistSelector}`);
      return;
    }
    const checkboxes = checklist.querySelectorAll('input[type=checkbox]');
    indexesToToggle.forEach((indexToToggle) => {
      const checkbox = checkboxes[indexToToggle] as HTMLFormElement;
      if (checkbox) {
        this.updateFormField(checkbox, !checkbox.checked);
      } else {
        // eslint-disable-next-line
        console.log(`Could not find checkbox at index ${indexToToggle}`);
      }
    });
  }

  static updateMultiSelect(selector: string | Element | ElementRef | DebugElement, value: any): void {
    const multiSelect = this.querySelector(selector);
    if (!multiSelect) {
      // eslint-disable-next-line
      console.warn(`Could not find multi-select ${multiSelect}`);
      return;
    }
    const multiSelectField = multiSelect.querySelector('.multiselect-field') as HTMLFormElement;
    this.updateFormField(multiSelectField, value);
    multiSelectField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  }

  static removeMultiSelect(selector: string, indexesToRemove: number[]): void {
    const multiSelect = this.querySelector(selector);
    if (!multiSelect) {
      // eslint-disable-next-line
      console.warn(`Could not find multi-select ${multiSelect}`);
      return;
    }
    const inputTagRemoveElements = multiSelect.querySelectorAll('.input-tag__remove');
    indexesToRemove.forEach((indexToRemove) => {
      const inputTagRemoveElement = inputTagRemoveElements[indexToRemove];
      if (inputTagRemoveElement) {
        inputTagRemoveElement.dispatchEvent(new MouseEvent('click'));
      } else {
        // eslint-disable-next-line
        console.warn(`Could not find multi-select item at index ${indexToRemove}`);
      }
    });
  }

  static typeKey(
    selector: string | Element | ElementRef | DebugElement,
    keyOrOptions: string | KeyboardEventInit
  ): void {
    const element = this.querySelector(selector) as HTMLAnchorElement;
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    let options = keyOrOptions as KeyboardEventInit;
    if (typeof keyOrOptions === 'string') {
      // Support passing keys like this: 'Enter', 'ctrl+Enter', 'ctrl+alt+Enter' etc.
      const keys = keyOrOptions.split('+');
      options = {
        key: keys[keys.length - 1],
        bubbles: true,
        cancelable: true,
        altKey: keys.includes('alt'),
        ctrlKey: keys.includes('ctrl'),
        shiftKey: keys.includes('shift'),
      };
    }
    const keyDownEvent = new KeyboardEvent('keydown', options);
    element.dispatchEvent(keyDownEvent);
    const keyPressEvent = new KeyboardEvent('keypress', options);
    element.dispatchEvent(keyPressEvent);
    const keyUpEvent = new KeyboardEvent('keyup', options);
    element.dispatchEvent(keyUpEvent);
  }

  static input(selector: string | Element | ElementRef | DebugElement) {
    const element = this.querySelector(selector) as HTMLInputElement;
    if (!element) {
      // eslint-disable-next-line
      console.warn(`Could not find element ${selector}`);
      return;
    }
    element.dispatchEvent(new Event('input'));
  }
}
