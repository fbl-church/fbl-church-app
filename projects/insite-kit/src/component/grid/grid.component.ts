import { HttpResponse } from '@angular/common/http';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GridDataloader } from '../../model/grid.model';
import { JwtService } from '../../service/auth/jwt.service';
import { GridChecklistColumnComponent } from './grid-checklist-column/grid-checklist-column.component';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridParamBuilder } from './grid-param-builder/grid-param-builder.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridSelectionColumnComponent } from './grid-selection-column/grid-selection-column.component';
import { GridShowAllComponent } from './grid-show-all/grid-show-all.component';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
})
export class GridComponent implements OnChanges, OnDestroy, AfterContentInit {
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
  @ContentChild(GridPagerComponent) gridPager: GridPagerComponent;
  @ContentChild(GridShowAllComponent) gridShowAll: GridShowAllComponent;
  @ContentChild(GridSearchComponent) gridSearch: GridSearchComponent;
  @ContentChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ContentChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;

  @Input() dataLoader: GridDataloader;
  @Input() overflowEnabled = false;
  @Input() preferenceKey: string;

  @Output() rowClick = new EventEmitter<any>();

  activePage = 1;
  currentSearch: any[] = [];
  loading = true;
  initialLoadComplete = false;

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();
  dataSubject = new Subject<HttpResponse<any[]>>();

  data: HttpResponse<any[]>;

  constructor(private readonly jwt: JwtService) {}

  get userPreferenceKey() {
    return `${this.preferenceKey}-${this.jwt.getEnvironment()}-${this.jwt.getUserId()}`;
  }
  /**
   * After the content has rendered then check the dataloader to see if a value
   * exists and set initial load to be true.
   */
  ngAfterContentInit() {
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
   * Cleans up the subscriptions and confirm the grid is not listening
   * for anymore data changes.
   */
  ngOnDestroy() {
    this.stopListeningForData.next();
    this.destroy.next();
  }

  /**
   * Base intialization for the grid that builds the view and loads the
   * data into the grid.
   */
  initGrid() {
    this.activePage = 1;

    this.initSearchSubscription();
    this.initPageChangeSubscription();
    this.initDataSubscription();

    this.loadPreferences();

    this.loadData();
  }

  /**
   * Intializes the search subscription. If the user searches on the grid, it will reload
   * the data with those search params and update the grid to reflect the new data.
   *
   * @returns If the grid does not support searching.
   */
  initSearchSubscription() {
    if (!this.gridSearch) {
      return;
    }

    this.gridSearch.search
      .pipe(
        tap(() => (this.activePage = 1)),
        tap((s) => (this.currentSearch = s)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.loadData());
  }

  /**
   * Listens for data changes, if the data subject is triggered it wil update the grid data, checklist
   * and selction if the data has changed. Then update the pager to correctly display the content.
   */
  initDataSubscription() {
    this.dataSubject
      .pipe(
        tap((res) => (this.data = res)),
        tap(() => this.updateSelection()),
        tap(() => this.updateChecklist()),
        tap(() => this.updatePager()),
        tap(() => this.updateShowAll()),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

  /**
   * Intialize the pager subscription, whenever a page changes, it needs to update the
   * params and call and update the grid to reflect the new paged data.
   *
   * @returns If the grid does not supporting paging.
   */
  initPageChangeSubscription() {
    if (!this.gridPager) {
      return;
    }

    this.gridPager.pageChange
      .pipe(
        tap((page) => (this.activePage = page)),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.loadData());
  }

  /**
   * Used for on initial load for checklist. It will update the data values
   * to populate with the grid checklist selected value.
   *
   * @returns If the grid does not support grid checklist column
   */
  updateChecklist() {
    if (!this.gridChecklistColumn) {
      return;
    }

    const currentSelectedIds = this.gridChecklistColumn.getSelected();
    if (currentSelectedIds && currentSelectedIds.length > 0) {
      this.data.body.forEach((r) => (r.selected = currentSelectedIds.includes(r.id)));
    }
  }

  /**
   * Used for on initial load for selection. It will update the data values
   * to populate with the grid selections.
   *
   * @returns If the grid does not support grid selection column
   */
  updateSelection() {
    if (!this.gridSelection) {
      return;
    }

    const currentSelections = this.gridSelection.getSelections();
    if (currentSelections.length > 0) {
      this.data.body.forEach((r) => (r.value = currentSelections.find((s) => s.id === r.id)?.value));
    }
  }

  /**
   * Updates the active list of what rows are checked, if the grid supports
   * checklist selection column
   *
   * @param event The event data that was selected.
   */
  onChecklistChange(event: any) {
    this.gridChecklistColumn.updateSelectedId(event);
  }

  /**
   * If the grid supports drop down selection, it will listen for selection changes
   * and add it the section map to be stored and retrieved later.
   *
   * @param event The event which is the data value
   * @param rowId Id associated to the row
   */
  onSelectionChange(event: any, rowId: number) {
    this.gridSelection.addSelection({
      id: rowId,
      value: event.target.value,
    });
  }

  /**
   * Loads the new data into the grid.
   *
   * @param search Optional search to be passed to the dataloader.
   */
  loadData() {
    this.loading = true;
    this.stopListeningForData.next();

    this.dataLoader
      .call(this, this.getGridParams(this.currentSearch).build())
      .pipe(takeUntil(this.stopListeningForData))
      .subscribe((res: HttpResponse<any[]>) => this.updateData(res));
  }

  /**
   * Gets the grid params to be passed along to the dataloader. Used for formatting
   * the request params for the dataloader.
   *
   * @param search The search to append to the grid params
   * @returns  The Grid param builder to be passed.
   */
  getGridParams(search?: string[]): GridParamBuilder {
    const params = new GridParamBuilder().withPaging(this.activePage, this.gridPager.pageSize).withSearch(search);

    if (this.preferenceKey) {
      localStorage.setItem(this.userPreferenceKey, JSON.stringify([...params.build()]));
    }

    return params;
  }

  /**
   * Emits the data subject change for the new data to format the grid
   * and the paging if it exists.
   *
   * @param response The response from the dataloader call
   */
  updateData(response: HttpResponse<any[]>) {
    this.dataSubject.next(response);
  }

  /**
   * Updates the pager if the data has changed. If the total count has changed
   * it will pull from the headers if defined, otherwise pull it from the length
   * of the data.
   *
   * @returns If the grid does not support paging.
   */
  updatePager() {
    if (!this.gridPager) {
      return;
    }

    let total = 0;
    if (this.data.headers.get('total-count')) {
      total = Number(this.data.headers.get('total-count'));
    } else {
      total = this.data.body?.length;
    }
    this.gridPager.update(total, this.activePage);
  }

  /**
   * Updates the show all in the grid.
   *
   * @returns If the grid does not support show all
   */
  updateShowAll() {
    if (!this.gridShowAll) {
      return;
    }

    this.gridShowAll.update(this.data.body.length);
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
   * Refreshes the grid by performing a call on the dataloader to
   * refresh.
   */
  refresh() {
    this.loadData();
  }

  /**
   * Clear the grid search and refresh.
   */
  clearSearch() {
    this.currentSearch = [];
    this.refresh();
  }

  resetGrid() {
    this.currentSearch = [];

    if (this.gridSearch) {
      this.gridSearch.clearSearch();
    }

    if (this.gridChecklistColumn) {
      this.gridChecklistColumn.selectedIds = [];
    }

    if (this.gridSelection) {
      this.gridSelection.selections = [];
    }

    this.refresh();
  }

  /**
   * Helper method to check if a grid value is a date, If it is a date then it
   * will format the date, otherwise just return false.
   *
   * @param value The value to check
   * @returns The formatted date if it is a date.
   */
  isDate(value: any): boolean {
    if (value && (typeof value === 'number' || /[a-zA-Z()]/g.test(value))) {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
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

    if (pref.size > 0) {
      this.gridPager.pageSize = Number(pref.get('pageSize')[0]);
      this.activePage = Number(pref.get('rowOffset')[0]) / this.gridPager.pageSize + 1;
      this.currentSearch = pref.get('search') ? pref.get('search') : [];
      this.gridSearch.searchValues = this.currentSearch;
    }
  }
}
