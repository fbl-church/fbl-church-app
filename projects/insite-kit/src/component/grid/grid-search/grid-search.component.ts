import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ik-grid-search',
  templateUrl: './grid-search.component.html',
})
export class GridSearchComponent {
  @Output() search = new EventEmitter<any>();
  searchIcon = faSearch;

  currentSearch = '';

  onSearch(value: string) {
    this.search.emit(value.trim());
  }
}
