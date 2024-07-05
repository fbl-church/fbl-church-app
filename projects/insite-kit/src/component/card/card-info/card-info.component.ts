import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-card-info',
  templateUrl: 'card-info.component.html',
})
export class CardInfoComponent {
  @Input() header: string;
  @Input() text: string;
  @Input() contentColor: 'DEFAULT' | 'DENIED' | 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'ENABLED' | 'DISABLED' = 'DEFAULT';
  @Input() padding = true;
  @Input() center = false;
}
