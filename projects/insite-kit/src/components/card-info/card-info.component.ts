import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent {
  @Input() header: string;
  @Input() text: string;
  @Input() contentColor = 'text-default';
  @Input() padding = true;
}
