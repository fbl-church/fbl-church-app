import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../card.component';

@Component({
  standalone: true,
  selector: 'ik-card-chip',
  templateUrl: 'card-chip.component.html',
  imports: [MatCardModule, CardComponent, NgClass],
})
export class CardChipComponent {
  @Input() title: string;
  @Input() value: string;
  @Input() padding = true;
  @Input() margin = true;
}
