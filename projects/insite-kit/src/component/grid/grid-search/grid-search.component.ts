import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-grid-search',
  templateUrl: './grid-search.component.html',
})
export class GridSearchComponent {
  @HostBinding('class.grid-search__container') hostClass = true;
  @Input() maxSearchInputs: number;
  @Output() search = new EventEmitter<any[]>();

  searchTags: string[] = [];

  set searchValues(values: string[]) {
    this.searchTags = values;
  }

  onSearch(tags: string[]) {
    this.search.emit(tags);
  }

  clearSearch() {
    this.searchTags = [];
  }
}
