import { Component, HostBinding, Input } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-icon',
  templateUrl: 'icon.component.html',
  host: {
    '[attr.disabled]': 'disabled || null',
  },
})
export class IconComponent {
  @Input() @HostBinding('class.icon--disabled') disabled: boolean;
  @Input() icon: IconName;
  @Input() classOverride: string;
  @Input() iconPrefix: IconPrefix = 'fas';
  @Input() spin = false;
  @Input() title = '';
}
