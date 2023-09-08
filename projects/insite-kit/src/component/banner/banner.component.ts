import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-banner',
  templateUrl: 'banner.component.html',
})
export class BannerComponent {
  @Input() type: 'info' | 'danger' | 'warning';
}
