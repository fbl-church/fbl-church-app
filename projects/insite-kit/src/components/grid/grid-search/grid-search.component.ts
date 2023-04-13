import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ik-grid-search',
  templateUrl: './grid-search.component.html',
  styleUrls: ['./grid-search.component.scss'],
})
export class GridSearchComponent {
  @Output() search = new EventEmitter<any>();

  currentSearch = '';

  onSearch(value: string) {
    this.search.emit(value.trim());
  }
}
