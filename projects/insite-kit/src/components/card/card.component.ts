import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string;
  @Input() padding = true;
  @Input() marginBottom = true;
}
