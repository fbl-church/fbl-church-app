import { HttpResponse } from '@angular/common/http';
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
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GridDataloader } from '../../models/grid.model';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { GridParamBuilder } from './grid-param-builder/grid-param-builder.component';
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

  @Input() dataLoader: GridDataloader;
  @Input() padding = true;
  @Input() basePath = '';
  @Input() overflowEnabled = false;

  @Output() rowClick = new EventEmitter<any>();

  activePage = 1;
  loading = true;
  initialLoadComplete = false;

  destroy = new Subject<void>();
  stopListeningForData = new Subject<void>();
  dataSubject = new Subject<HttpResponse<any[]>>();

  data: HttpResponse<any[]>;

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
    this.stopListeningForData.next();
    this.destroy.next();
  }

  initGrid() {
    this.activePage = 1;

    this.initSearchSubscription();
    this.initPageChangeSubscription();
    this.initDataSubscription();

    this.loadData();
  }

  initSearchSubscription() {
    if (!this.gridSearch) {
      return;
    }

    this.gridSearch.search
      .pipe(
        tap(() => (this.activePage = 1)),
        takeUntil(this.destroy)
      )
      .subscribe((s) => this.loadData(s));
  }

  initDataSubscription() {
    this.dataSubject
      .pipe(
        tap((res) => (this.data = res)),
        tap(() => this.updatePager()),
        tap(() => this.updateShowAll()),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));
  }

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

  loadData(search?: string) {
    this.loading = true;
    this.stopListeningForData.next();

    this.dataLoader
      .call(this, this.getGridParams(search).build())
      .pipe(takeUntil(this.stopListeningForData))
      .subscribe((res: HttpResponse<any[]>) => this.updateData(res));
  }

  getGridParams(search?: string): GridParamBuilder {
    return new GridParamBuilder()
      .withPaging(this.activePage, this.gridPager.pageSize)
      .withSearch(search);
  }

  updateData(response: HttpResponse<any[]>) {
    this.dataSubject.next(response);
  }

  updatePager() {
    if (!this.gridPager) {
      return;
    }

    const total = Number(this.data.headers.get('total-count'));
    this.gridPager.update(total, this.activePage);
  }

  updateShowAll() {
    if (!this.gridShowAll) {
      return;
    }

    this.gridShowAll.update(this.data.body.length);
  }

  onRowClick(event: any) {
    this.rowClick.emit(event);
  }

  refresh() {
    this.loadData();
  }

  isDate(value: any): boolean {
    if (typeof value === 'number') {
      return false;
    } else {
      let dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
    }
  }
}
