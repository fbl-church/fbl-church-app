import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { GridDataloader } from 'projects/insite-kit/src/model/grid.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { CardModule } from '../card/card.module';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridParamBuilder } from './grid-param-builder/grid-param-builder.component';
import { GridSearchComponent } from './grid-search/grid-searchcomponent';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
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
    CommonModule,
  ],
})
export class GridComponent implements AfterContentInit {
  @ContentChild(GridPagerComponent) gridPager: GridPagerComponent;
  @ContentChild(GridSearchComponent) gridSearch: GridSearchComponent;
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;

  @Input() dataLoader: GridDataloader;
  @Input() preferenceKey: string;
  @Input() resultKey = 'Data';
  @Output() rowClick = new EventEmitter<any>();

  displayedColumns: string[] = [];
  dataSource: any[] = [];
  loading = true;
  initialLoadComplete = false;

  currentSearch: any[] = [];

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();
  previousPageSize = 0;

  constructor(private readonly jwt: JwtService, private readonly cdr: ChangeDetectorRef) {}

  get userPreferenceKey() {
    return `${this.preferenceKey}-${this.jwt.getEnvironment()}-${this.jwt.getUserId()}`;
  }

  /**
   * After the content has rendered then check the dataloader to see if a value
   * exists and set initial load to be true.
   */
  ngAfterContentInit(): void {
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

  /**
   * Base intialization for the grid that builds the view and loads the
   * data into the grid.
   */
  initGrid() {
    this.initColumnHeaders();
    this.loadPreferences();
    this.initPageListener();
    this.initSearchListener();

    this.loadData();
  }

  /**
   * Initializes the column headers for the grid.
   */
  initColumnHeaders() {
    this.columns.forEach((column) => this.displayedColumns.push(column.label));
  }

  /**
   * Initializes the page listener for the grid. If the user changes the page on the grid.
   */
  initPageListener() {
    if (!this.gridPager) {
      return;
    }

    this.previousPageSize = this.gridPager.pageSize;
    this.gridPager.paginator.page.subscribe((res) => {
      // Return to the first page if the page size changes
      if (Number(this.previousPageSize) !== res.pageSize) {
        this.previousPageSize = res.pageSize;
        this.gridPager.paginator.firstPage();
      }

      this.refresh();
    });
  }

  /**
   * Intializes the search subscription. If the user searches on the grid, it will reload
   * the data with those search params and update the grid to reflect the new data.
   *
   * @returns If the grid does not support searching.
   */
  initSearchListener() {
    if (!this.gridSearch) {
      return;
    }

    this.gridSearch.search
      .pipe(
        tap(() => this.gridPager.paginator.firstPage()),
        tap((s) => (this.currentSearch = s)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.refresh());
  }

  /**
   * Refreshes the grid by performing a call on the dataloader to
   * refresh.
   */
  refresh() {
    this.loadData();
  }

  /**
   * Clears the data from the grid.
   */
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
      .call(this, this.getGridParams(this.currentSearch).build())
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
    if (this.gridPager) {
      if (response?.headers && response?.headers.get('total-count')) {
        this.gridPager.paginator.length = Number(response.headers.get('total-count'));
      } else {
        this.gridPager.paginator.length = response.body?.length;
      }
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
    let params = new GridParamBuilder();
    if (this.gridPager) {
      params = params.withPaging(
        this.gridPager.paginator.pageIndex,
        this.gridPager.paginator.pageSize || this.gridPager.pageSize
      );
    }

    params = params.withSearch(search);

    if (this.preferenceKey) {
      localStorage.setItem(this.userPreferenceKey, JSON.stringify([...params.build()]));
    }

    return params;
  }

  /**
   * Emits the data on the row that was clicked.
   *
   * @param event The row data to emit.
   */
  onRowClick(event: any) {
    this.rowClick.emit(event);
  }

  /**
   * Will load the current user preferences. If the user does not have any
   * preferences, and the grid supports a preference key then it will be added
   * for them to store.
   */
  private loadPreferences() {
    if (!this.preferenceKey) {
      return;
    }

    const pref = new Map<string, string[]>(JSON.parse(localStorage.getItem(this.userPreferenceKey)));

    if (pref.size > 0 && this.gridPager) {
      this.gridPager.updatePageSize(
        Number(pref.get('pageSize')[0]),
        Number(pref.get('rowOffset')[0]) / Number(pref.get('pageSize')[0])
      );

      this.currentSearch = pref.get('search') ? pref.get('search') : [];
      if (this.gridSearch) {
        this.gridSearch.searchValues = this.currentSearch;
      }
    }
  }
}
