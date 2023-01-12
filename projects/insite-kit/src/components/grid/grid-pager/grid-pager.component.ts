import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-grid-pager',
  templateUrl: './grid-pager.component.html',
  styleUrls: ['./grid-pager.component.scss'],
})
export class GridPagerComponent {
  dataLength: number = 0;
  translationKey: string = '';
  storageTag = 'gridCurrentPage';

  totalPages: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;
  pages: any;

  constructor(private readonly router: Router) {}

  initPager(
    length: number,
    index: number,
    size: number,
    key: string,
    tag: string
  ) {
    this.dataLength = length;
    this.pageIndex = index;
    this.pageSize = size;
    this.translationKey = key;
    this.storageTag = tag;
    this.setFooter();
  }

  setFooter() {
    this.totalPages = Math.ceil(this.dataLength / this.pageSize);
    this.updatePageFooter(this.pageIndex);
  }

  updateRoute(index: number) {
    localStorage.setItem(this.storageTag, `${index}`);
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([], { state: { currentPage: index } });
  }

  pageClick(page: number) {
    this.pageIndex = page * this.pageSize - this.pageSize;
    this.updateRoute(this.pageIndex);
  }

  onNextPageClick() {
    if (this.pageIndex < this.dataLength) {
      this.updateRoute(this.pageIndex);
    }
  }

  onPreviousPageClick() {
    if (this.pageIndex > this.pageSize) {
      this.pageIndex =
        this.pageIndex - this.pageSize - this.calculatePageRowSize();
      this.updateRoute(this.pageIndex);
    }
  }

  calculatePageRowSize() {
    const resultsLeft = this.dataLength - this.pageIndex;
    return resultsLeft === 0 ? this.dataLength % this.pageSize : this.pageSize;
  }

  updatePageFooter(index: number) {
    this.pageIndex = index;

    const page = Math.ceil(this.pageIndex / this.pageSize);

    if (page === 1) {
      this.pages = [
        {
          pageNum: page,
          active: true,
        },
        {
          pageNum: page + 1,
          active: false,
        },
        {
          pageNum: page + 2,
          active: false,
        },
      ];
    } else if (page === this.totalPages) {
      this.pages = [
        {
          pageNum: page - 2,
          active: false,
        },
        {
          pageNum: page - 1,
          active: false,
        },
        {
          pageNum: page,
          active: true,
        },
      ];
    } else {
      this.pages = [
        {
          pageNum: page - 1,
          active: false,
        },
        {
          pageNum: page,
          active: true,
        },
        {
          pageNum: page + 1,
          active: false,
        },
      ];
    }
  }
}
