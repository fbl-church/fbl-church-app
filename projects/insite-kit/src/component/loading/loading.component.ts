import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-loading',
  templateUrl: 'loading.component.html',
})
export class LoadingComponent {
  @Input() size = '110px';
  @Input() thickness = '8px';
  @Input() type: 'default' | 'ellipsis' = 'default';
  @Input() backgroundColor = '#EBEFF5';
  @Input() margin: string;
}
