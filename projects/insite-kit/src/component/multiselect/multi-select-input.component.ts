import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DeprecatedDropdownItem } from './dropdown-item.model';
import { DeprecatedValueAccessorBase } from './value-accessor-base';

@Component({
  selector: 'ik-multi-select',
  templateUrl: './multi-select-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectInputComponent),
      multi: true,
    },
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class MultiSelectInputComponent
  extends DeprecatedValueAccessorBase<any>
  implements OnInit
{
  @Input() items: DeprecatedDropdownItem[];
  @Input() formControlName: string;
  @Input() prefix: string;
  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;

  constructor() {
    super();
  }

  ngOnInit() {
    this.value = this.items ? this.items.find((i) => i.selected) : null;
  }

  onBlur() {
    this.touch();
  }

  unselect(event) {
    this.ngSelect.unselect(event);
  }
}
