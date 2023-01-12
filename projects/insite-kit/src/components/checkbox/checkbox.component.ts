import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checkId: string;
  @Input() checked = false;

  @Output() checkboxChange = new EventEmitter<boolean>();

  valueChange(event: any) {
    this.checkboxChange.emit(event.target.checked);
  }
}
