import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ik-card-header',
  templateUrl: 'card-header.component.html',
})
export class CardHeaderComponent {
  @HostBinding('class.card__header') hostClass = true;
  @Input() title: string;
}
