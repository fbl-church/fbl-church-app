import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CardModule } from '../../card/card.module';

@Component({
  selector: 'ik-grid-search',
  templateUrl: './grid-search.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CardModule,
    MatChipsModule,
    NgFor,
    NgIf,
  ],
})
export class GridSearchComponent {
  @HostBinding('class.grid-search') hostClass = true;
  @Input() maxSearchInputs: number;
  @Output() search = new EventEmitter<any[]>();

  searchTags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private cdr: ChangeDetectorRef) {}

  set searchValues(values: string[]) {
    this.searchTags = values;
    this.cdr.detectChanges();
  }

  onSearch(tags: string[]) {
    this.search.emit(tags);
  }

  clearSearch() {
    this.searchTags = [];
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.searchTags.push(value);
      this.search.emit(this.searchTags);
    }

    event.chipInput!.clear();
  }

  remove(search: any): void {
    const index = this.searchTags.indexOf(search);

    if (index >= 0) {
      this.searchTags.splice(index, 1);
    }
    this.search.emit(this.searchTags);
  }
}
