import { Component, EventEmitter, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-header-back',
  templateUrl: 'header-back.component.html',
})
export class HeaderBackComponent {
  @Output() back = new EventEmitter<any>();

  backArrow = faArrowLeft;

  onBackClick() {
    this.back.emit();
  }
}
