import { Component, Input } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-icon',
  templateUrl: 'icon.component.html',
})
export class IconComponent {
  @Input() icon: IconName;
  @Input() classOverride: string;
  @Input() iconPrefix: IconPrefix = 'fas';
  @Input() spin = false;
  @Input() title = '';
}
