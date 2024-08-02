import { NgClass, NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ik-card-info',
  templateUrl: 'card-info.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
})
export class CardInfoComponent {
  @HostBinding('class.card-info') hostClass = true;
  @Input() header: string;
  @Input() text: string;
  @Input() contentColor: 'DEFAULT' | 'DENIED' | 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'ENABLED' | 'DISABLED' = 'DEFAULT';
  @Input() center = false;
}
