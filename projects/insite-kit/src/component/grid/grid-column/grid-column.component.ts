import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ik-grid-column',
  template: '',
  standalone: true,
})
export class GridColumnComponent {
  @Input() label: string;
  @Input() field: string;
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
}
