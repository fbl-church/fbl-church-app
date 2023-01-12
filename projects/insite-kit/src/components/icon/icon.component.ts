import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() icon: IconDefinition;
  @Input() size: string = '24px';
  @Input() color: string = 'white';
  @Input() classOverride: string;
}
