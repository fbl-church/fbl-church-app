import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'ik-grid-pager',
  templateUrl: './grid-pager.component.html',
  standalone: true,
  imports: [MatPaginatorModule, NgClass],
})
export class GridPagerComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() pageSize = 15;
  @Input() hidePageSize = false;
  @Input() key = '';
  @Input() disabled = false;
  @Input() pageSizeOptions = [5, 10, 15, 25];

  constructor(private cdr: ChangeDetectorRef) {}

  updatePageSize(pageSize: number, index: number) {
    this.pageSize = pageSize;
    this.paginator.pageSize = pageSize;
    this.paginator.pageIndex = Math.floor(index);
    this.cdr.detectChanges();
  }
}
