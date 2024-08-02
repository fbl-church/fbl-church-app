import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ik-card',
  templateUrl: 'card.component.html',
  imports: [MatCardModule, NgClass],
})
export class CardComponent {
  @Input() padding = true;
  @Input() margin = true;
}
