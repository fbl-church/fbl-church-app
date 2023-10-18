import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ik-grid-search',
  templateUrl: './grid-search.component.html',
})
export class GridSearchComponent {
  @Output() search = new EventEmitter<any[]>();

  searchTags: string[] = [];

  set searchValues(values: string[]) {
    this.searchTags = values;
  }

  onSearch(tags: string[]) {
    this.search.emit(tags);
  }
}
