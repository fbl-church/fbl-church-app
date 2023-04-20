import { Component, EventEmitter, Output } from '@angular/core';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-header-back',
  templateUrl: 'header-back.component.html',
})
export class HeaderBackComponent {
  @Output() back = new EventEmitter<any>();

  backArrow = faLeftLong;

  onBackClick() {
    this.back.emit();
  }
}
