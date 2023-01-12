import {
  AfterViewInit,
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
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridShowAllComponent } from './grid-show-all/grid-show-all.component';

@Component({
  selector: 'ik-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
  @ContentChild(GridPagerComponent) gridPager: GridPagerComponent;
  @ContentChild(GridShowAllComponent) gridShowAll: GridShowAllComponent;
  @ContentChild(GridSearchComponent) gridSearch: GridSearchComponent;

  @Input() dataLoader: any[] = [];
  @Input() translationKey: any;
  @Input() pageSize = 15;
  @Input() padding = true;
  @Input() basePath = '';
  @Input() overflowEnabled = false;
  @Input() storageTag = 'gridCurrentPage';
  @Input() alwaysDestroy = false;
  @Input() idTag = 'id';

  @Output() rowClick = new EventEmitter<any>();

  gridContent = [[]];
  gridIndex = 0;

  loading = true;
  destroy = new Subject<void>();
  initialLoadComplete = false;

  constructor(private readonly router: Router) {}

  ngAfterViewInit() {
    this.checkDataLoader();
    this.initialLoadComplete = true;
  }

  ngOnChanges() {
    if (this.initialLoadComplete) {
      this.checkDataLoader();
    }
  }

  checkDataLoader() {
    if (this.dataLoader) {
      this.initGrid();
    } else {
      this.loading = true;
    }
  }

  ngOnDestroy() {
    if (this.isNewAppRoute() || this.alwaysDestroy) {
      localStorage.removeItem(this.storageTag);
    }
    this.destroy.next();
  }

  initGrid() {
    this.gridIndex = Number(localStorage.getItem(this.storageTag)) | 0;
    this.loading = false;

    this.addGridPager();
    this.addGridShowAll();
    this.addGridSearch();
    this.getPageData();
    this.listenToRoute();
  }

  refresh() {
    this.loading = true;
  }

  addGridPager() {
    if (this.gridPager) {
      this.gridPager.initPager(
        this.dataLoader.length,
        this.gridIndex,
        this.pageSize,
        this.translationKey,
        this.storageTag
      );
    } else {
      this.gridIndex = 0;
    }
  }

  addGridShowAll() {
    if (this.gridShowAll) {
      this.gridShowAll.init(this.dataLoader.length);
    }
  }

  addGridSearch() {
    if (this.gridSearch) {
      this.gridSearch.search.pipe(takeUntil(this.destroy)).subscribe(() => {
        this.loading = true;
        this.gridPager.updateRoute(0);
      });
    }
  }

  getDataById(id: any) {
    return this.dataLoader.find((v) => v[this.idTag] === id);
  }

  listenToRoute() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.onGridChange());
  }

  onGridChange() {
    this.gridIndex = Number(localStorage.getItem(this.storageTag));
    this.getPageData();
  }

  onRowClick(event: number) {
    this.rowClick.emit(
      this.dataLoader[event + this.gridIndex - this.gridContent.length]
    );
  }

  getPageData() {
    this.gridContent = [];

    for (let i = 0; i < this.pageSize && this.dataLoader[this.gridIndex]; i++) {
      this.gridContent.push(Object.values(this.getRowData(this.gridIndex++)));
    }

    if (this.gridPager) {
      this.gridPager.updatePageFooter(this.gridIndex);
    }
  }

  getRowData(index: number) {
    const arrayData = [];
    this.columns?.forEach((col) => {
      const val = this.dataLoader[index][col.field];
      arrayData.push(val ? val : '-');
    });
    return arrayData;
  }

  isDate(value: any) {
    if (typeof value === 'number') {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
  }

  isNewAppRoute() {
    return !this.router.url.includes(`/${this.basePath}`);
  }
}
