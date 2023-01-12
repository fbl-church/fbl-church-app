import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ik-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent {
  @Output() back = new EventEmitter<any>();

  onBackClick() {
    this.back.emit();
  }
}
