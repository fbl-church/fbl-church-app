import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
  @Input() size = '110px';
  @Input() thickness = '8px';
}
