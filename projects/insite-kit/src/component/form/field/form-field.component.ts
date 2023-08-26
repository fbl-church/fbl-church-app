import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-form-field',
  templateUrl: 'form-field.component.html',
})
export class FormFieldComponent {
  @Input() header: string;
  @Input() padding = true;
}
