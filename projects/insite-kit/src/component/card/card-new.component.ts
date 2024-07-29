import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ik-card-new',
  templateUrl: 'card-new.component.html',
  imports: [MatCardModule],
})
export class CardNewComponent {
  // @HostBinding('class.card') hostClass = true;
}
