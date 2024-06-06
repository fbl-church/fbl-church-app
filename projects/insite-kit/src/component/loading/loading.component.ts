import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-loading',
  templateUrl: 'loading.component.html',
})
export class LoadingComponent {
  @Input() size = '100px';
  @Input() thickness = '4px';
  @Input() type: 'default' | 'ellipsis' | 'double' = 'default';
  @Input() backgroundColor = '#EDF1F7';
  @Input() margin: string;
}
