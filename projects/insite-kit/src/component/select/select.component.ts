import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownItem } from './dropdown-item.model';
import { ValueAccessorBase } from './value-accessor-base.component';

@Component({
  selector: 'ik-single-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectInputComponent),
      multi: true,
    },
  ],
})
export class SingleSelectInputComponent extends ValueAccessorBase<any> implements OnInit {
  @Input() items: DropdownItem[];
  @Input() clearable = false;
  @Input() disable = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.value = this.items ? this.items.find((i) => i.selected) : null;
  }

  onChange(event) {
    this.value = event;

    this.change.emit(this.value);
  }

  onBlur() {
    this.touch();
  }
}
