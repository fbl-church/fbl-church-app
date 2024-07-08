import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-modal-header',
  templateUrl: 'modal-header.component.html',
})
export class ModalHeaderComponent {
  @Input() title = '';
  @Input() type: 'warning' | 'info' | 'danger' | 'default' = 'default';
  @Input() showCloseIcon = false;
  @Output() close = new EventEmitter<void>();
}
