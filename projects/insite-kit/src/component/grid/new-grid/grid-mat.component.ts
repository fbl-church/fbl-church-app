import { NgFor, NgIf } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { GridDataloader } from 'projects/insite-kit/src/model/grid.model';
import { Subject, takeUntil } from 'rxjs';
import { GridColumnComponent } from '../grid-column/grid-column.component';
import { GridParamBuilder } from '../grid-param-builder/grid-param-builder.component';

@Component({
  selector: 'ik-grid-mat',
  templateUrl: './grid-mat.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgFor,
    NgIf,
  ],
})
export class GridMatComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  dataSource: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;

  @Input() dataLoader: GridDataloader;
  @Input() pageSize = 15;
  @Input() preferenceKey: string;
  @Output() rowClick = new EventEmitter<any>();

  loading = true;
  initialLoadComplete = false;

  currentSearch: any[] = [];

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();

  /**
   * After the view has rendered then check the dataloader to see if a value
   * exists and set initial load to be true.
   */
  ngAfterViewInit(): void {
    this.checkDataLoader();
    this.initialLoadComplete = true;
  }

  /**
   * Listen for changes to the component. If the dataloader is updated,
   * reload the grid.
   */
  ngOnChanges() {
    if (this.initialLoadComplete) {
      this.checkDataLoader();
    }
  }

  /**
   * Checks to see if the dataloader passed in is defined. If it is then it will
   * intialize the grid, otherwise it will continue loading.
   */
  checkDataLoader() {
    if (this.dataLoader) {
      this.initGrid();
    } else {
      this.loading = true;
    }
  }

  initGrid() {
    this.paginator.page.subscribe(() => this.refresh());
    this.columns.forEach((column) => {
      this.displayedColumns.push(column.label);
    });
    console.log('COLUMNS', this.displayedColumns);
    this.loadData();
  }

  /**
   * Refreshes the grid by performing a call on the dataloader to
   * refresh.
   */
  refresh() {
    this.loadData();
  }

  clearData() {
    this.dataSource = [];
  }

  /**
   * Loads the new data into the grid.
   *
   * @param search Optional search to be passed to the dataloader.
   */
  loadData() {
    this.loading = true;
    this.clearData();
    this.stopListeningForData.next();

    this.dataLoader
      .call(this, this.getGridParams().build())
      .pipe(takeUntil(this.stopListeningForData))
      .subscribe((res: HttpResponse<any[]>) => this.updateData(res));
  }

  /**
   * Emits the data subject change for the new data to format the grid
   * and the paging if it exists.
   *
   * @param response The response from the dataloader call
   */
  updateData(response: HttpResponse<any[]>) {
    this.dataSource = response.body;
    if (response?.headers && response?.headers.get('total-count')) {
      this.paginator.length = Number(response.headers.get('total-count'));
    } else {
      this.paginator.length = response.body?.length;
    }

    this.loading = false;
  }

  /**
   * Gets the grid params to be passed along to the dataloader. Used for formatting
   * the request params for the dataloader.
   *
   * @param search The search to append to the grid params
   * @returns  The Grid param builder to be passed.
   */
  getGridParams(search?: string[]): GridParamBuilder {
    console.log(this.paginator);
    const params = new GridParamBuilder()
      .withPaging(this.paginator.pageIndex + 1, this.paginator.pageSize)
      .withSearch(search);

    // if (this.preferenceKey) {
    //   localStorage.setItem(this.userPreferenceKey, JSON.stringify([...params.build()]));
    // }

    return params;
  }

  /**
   * Emits the data on the row that was clicked.
   *
   * @param event The row data to emit.
   */
  onRowClick(event: any) {
    console.log(event);
    this.rowClick.emit(event);
  }
}
