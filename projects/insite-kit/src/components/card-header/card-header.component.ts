import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  @Input() title: string;
}
