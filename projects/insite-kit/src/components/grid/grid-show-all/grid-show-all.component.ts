import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ik-grid-show-all',
  templateUrl: './grid-show-all.component.html',
  styleUrls: ['./grid-show-all.component.scss'],
})
export class GridShowAllComponent {
  @Output() showAll = new EventEmitter<any>();

  dataLength = 0;

  update(length: number) {
    this.dataLength = length;
  }

  onShowAllClick() {
    this.showAll.emit();
  }
}
