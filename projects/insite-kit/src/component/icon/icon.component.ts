import { NgClass, NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-icon',
  templateUrl: 'icon.component.html',
  host: {
    '[attr.disabled]': 'disabled || null',
  },
  standalone: true,
  imports: [NgClass, NgIf, FontAwesomeModule],
})
export class IconComponent {
  @Input() @HostBinding('class.icon--disabled') disabled: boolean;
  @Input() icon: IconName;
  @Input() classOverride: string;
  @Input() iconPrefix: IconPrefix = 'fas';
  @Input() spin = false;
  @Input() title = '';
}
