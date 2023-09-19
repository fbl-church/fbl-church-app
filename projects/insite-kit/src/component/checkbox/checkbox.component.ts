import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-checkbox',
  templateUrl: 'checkbox.component.html',
})
export class CheckboxComponent {
  @Input() checkId: string;
  @Input() checked = false;

  @Output() checkboxChange = new EventEmitter<any>();

  valueChange(event: any) {
    this.checked = event.target.checked;
    this.checkboxChange.emit({
      id: this.checkId,
      selected: event.target.checked,
    });
  }
}
