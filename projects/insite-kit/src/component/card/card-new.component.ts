import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ik-card-new',
  templateUrl: 'card-new.component.html',
  imports: [MatCardModule, NgClass],
})
export class CardNewComponent {
  // @HostBinding('class.card') hostClass = true;
  @Input() padding = true;
  @Input() margin = true;
}
