import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-input-tag',
  templateUrl: './input-tag.component.html',
})
export class InputTagComponent {
  @Input() text = '';
  @Input() index: number;
  @Input() selected = false;
  @Output() remove = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.index);
  }
}
