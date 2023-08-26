import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ik-form',
  templateUrl: 'form.component.html',
})
export class FormComponent {
  @Input() formGroup: FormGroup;
}
