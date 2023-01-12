import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-column',
  template: '',
})
export class GridColumnComponent {
  @Input() label: string;
  @Input() field: string;

  constructor() {}
}
