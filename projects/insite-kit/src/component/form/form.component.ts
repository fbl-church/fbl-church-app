import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';

@Component({
  selector: 'ik-form',
  templateUrl: 'form.component.html',
  standalone: true,
  imports: [CardModule, FormsModule, ReactiveFormsModule],
})
export class FormComponent {
  @Input() formGroup: FormGroup;
}
