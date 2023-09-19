import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ik-header-back',
  templateUrl: 'header-back.component.html',
})
export class HeaderBackComponent {
  @Output() back = new EventEmitter<any>();

  onBackClick() {
    this.back.emit();
  }
}
