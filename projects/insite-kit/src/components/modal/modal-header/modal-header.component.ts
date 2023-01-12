import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title = '';
  @Input() type: 'warning' | 'info' | 'danger' | 'default' = 'default';
}
