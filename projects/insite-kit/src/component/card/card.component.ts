import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-card',
  templateUrl: 'card.component.html',
})
export class CardComponent {
  @Input() marginBottom = true;
}
