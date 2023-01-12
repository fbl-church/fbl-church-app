import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'ik-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() name = 'baseModal';
  private readonly bootstrap = bootstrap;

  open() {
    $(`#${this.name}`).modal('show');
  }

  close() {
    $(`#${this.name}`).modal('hide');
  }
}
