import { Component, Input } from '@angular/core';
import {
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-banner',
  templateUrl: 'banner.component.html',
})
export class BannerComponent {
  @Input() type: 'info' | 'danger' | 'warning';

  warningIcon = faTriangleExclamation;
  dangerIcon = faCircleExclamation;
  infoIcon = faCircleInfo;
}
